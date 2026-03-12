import type { IQuery } from '../type';
import { QueryFilter } from 'mongoose';
import Storage, { IStorage } from '../../models/master/storage.model';
import { ApiError } from '../../utils/apiError';
import { ERROR_MESSAGES } from '../../utils/message';

export const createStorage = async (
  storageData: Partial<IStorage>
): Promise<IStorage> => {
  return await Storage.create(storageData);
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
  const storage = await Storage.findOne({ _id: id, isDeleted: false });
  if (!storage) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Penyimpanan'));
  }

  return storage;
};

export const updateStorage = async (
  id: string,
  updateData: Partial<IStorage>
) => {
  const storage = await Storage.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true, runValidators: true }
  );

  if (!storage) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Penyimpanan'));
  }

  return storage;
};

export const deleteStorage = async (id: string) => {
  const storage = await Storage.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!storage) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Penyimpanan'));
  }

  return storage;
};
