import type { IQuery } from '../type';
import { QueryFilter } from 'mongoose';
import Storage, { IStorage } from '../../models/master/storage.model';
import { ApiError } from '../../utils/apiError';
import { ERROR_MESSAGES } from '../../utils/message';
import { Types } from 'mongoose';

export const createStorage = async (
  storageData: Partial<IStorage>,
  userId: Types.ObjectId
): Promise<IStorage> => {
  // cek apakah data sudah ada tapi terhapus
  const deletedStorage = await Storage.findOne({
    code: storageData.code,
    isDeleted: true,
  });

  // jika ada, restore data tersebut
  if (deletedStorage) {
    const restored = await Storage.findOneAndUpdate(
      deletedStorage._id,
      {
        ...storageData,
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
        updatedBy: userId,
      },
      { new: true }
    );

    if (!restored) {
      throw new ApiError(500, 'Gagal mengembalikan penyimpanan');
    }

    return restored;
  }

  return await Storage.create({ ...storageData, createdBy: userId });
};

export const getAllStorage = async (query: IQuery) => {
  const {
    search = '',
    sortBy = 'createdAt',
    order = 'desc',
    page = 1,
    limit = 10,
  } = query;

  const pageNum = Math.abs(parseInt(page as string)) || 1;
  const limitNum = Math.abs(parseInt(limit as string)) || 10;
  const skip = (pageNum - 1) * limitNum;

  const filter: QueryFilter<IStorage> = { isDeleted: false };
  if (search) {
    filter.code = { $regex: search, $options: 'i' };
  }

  const [data, total] = await Promise.all([
    Storage.find(filter)
      .populate('createdBy updatedBy deletedBy', 'name')
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limitNum),

    Storage.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    data: data,
    total: total,
    pagination: {
      totalPages,
      currentPages: pageNum,
      limit: limitNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};

export const getStorageById = async (id: string) => {
  const storage = await Storage.findOne({ _id: id, isDeleted: false }).populate(
    'createdBy updatedBy deletedBy',
    'name'
  );

  if (!storage) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Penyimpanan'));
  }

  return storage;
};

export const updateStorage = async (
  id: string,
  updateData: Partial<IStorage>,
  userId: Types.ObjectId
) => {
  const storage = await Storage.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { ...updateData, updatedBy: userId },
    { new: true, runValidators: true }
  );

  if (!storage) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Penyimpanan'));
  }

  return storage;
};

export const deleteStorage = async (id: string, userId: Types.ObjectId) => {
  const storage = await Storage.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date(), deletedBy: userId },
    { new: true }
  );

  if (!storage) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Penyimpanan'));
  }

  return storage;
};
