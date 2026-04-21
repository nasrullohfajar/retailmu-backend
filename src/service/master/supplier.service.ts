import Supplier, { ISupplier } from '../../models/master/supplier.model';
import { ApiError } from '../../utils/apiError';
import { ERROR_MESSAGES } from '../../utils/message';
import { Types } from 'mongoose';

export const createSupplier = async (
  supplierData: Partial<ISupplier>,
  userId: Types.ObjectId
): Promise<ISupplier> => {
  // cek apakah data sudah ada tapi terhapus
  const deletedSupplier = await Supplier.findOne({
    code: supplierData.code,
    isDeleted: true,
  });

  // jika ada, restore data tersebut
  if (deletedSupplier) {
    const restored = await Supplier.findByIdAndUpdate(
      deletedSupplier._id,
      {
        ...supplierData,
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
        updatedBy: userId,
      },
      { new: true }
    );

    if (!restored) {
      throw new ApiError(500, 'Gagal mengembalikan supplier');
    }

    return restored;
  }

  return await Supplier.create({ ...supplierData, createdBy: userId });
};

export const getAllSupplier = async (query: any) => {
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

  const filter: any = { isDeleted: false };
  if (search) {
    filter.$or = [
      { code: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
      { pic: { $regex: search, $options: 'i' } },
    ];
  }

  const [data, total] = await Promise.all([
    Supplier.find(filter)
      .populate('createdBy updatedBy deletedBy', 'name')
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limitNum),

    Supplier.countDocuments(filter),
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

export const getSupplierById = async (id: string) => {
  const supplier = await Supplier.findOne({
    _id: id,
    isDeleted: false,
  }).populate('createdBy updatedBy deletedBy', 'name');

  if (!supplier) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Supplier'));
  }

  return supplier;
};

export const updateSupplier = async (
  id: string,
  updateData: Partial<ISupplier>,
  userId: Types.ObjectId
) => {
  const supplier = await Supplier.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { ...updateData, updatedBy: userId },
    { new: true, runValidators: true }
  );

  if (!supplier) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Supplier'));
  }

  return supplier;
};

export const deleteSupplier = async (id: string, userId: Types.ObjectId) => {
  const supplier = await Supplier.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date(), deletedBy: userId },
    { new: true }
  );

  if (!supplier) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Supplier'));
  }

  return supplier;
};
