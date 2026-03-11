import Supplier, { ISupplier } from '../../models/master/supplier.model';
import { ApiError } from '../../utils/apiError';
import { ERROR_MESSAGES } from '../../utils/message';

export const createSupplier = async (
  supplierData: Partial<ISupplier>
): Promise<ISupplier> => {
  return await Supplier.create(supplierData);
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
    filter.name = { $regex: search, $options: 'i' };
  }

  const [data, total] = await Promise.all([
    Supplier.find(filter)
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
  const supplier = await Supplier.findOne({ _id: id, isDeleted: false });
  if (!supplier) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Supplier'));
  }

  return supplier;
};

export const updateSupplier = async (
  id: string,
  updateData: Partial<ISupplier>
) => {
  const supplier = await Supplier.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true, runValidators: true }
  );

  if (!supplier) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Supplier'));
  }

  return supplier;
};

export const deleteSupplier = async (id: string) => {
  const supplier = await Supplier.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!supplier) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Supplier'));
  }

  return supplier;
};
