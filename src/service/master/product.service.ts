import { Types, QueryFilter } from 'mongoose';
import { IQuery } from '../type';
import Product, { IProduct } from '../../models/master/product.model';
import { ApiError } from '../../utils/apiError';
import { ERROR_MESSAGES } from '../../utils/message';

export const createProduct = async (
  productData: Partial<IProduct>,
  userId: Types.ObjectId
): Promise<IProduct> => {
  return await Product.create({
    ...productData,
    createdBy: userId,
  });
};

export const getAllProduct = async (query: IQuery) => {
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

  const filter: QueryFilter<IProduct> = { isDeleted: false };
  if (search) {
    filter.$or = [
      { code: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
    ];
  }

  const [data, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name')
      .populate('storage', 'code')
      .populate('createdBy updatedBy deletedBy', 'name')
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limitNum),

    Product.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    data: data,
    total: total,
    pagination: {
      totalPages,
      currentPage: pageNum,
      limit: limitNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};

export const getProductById = async (id: string) => {
  const product = await Product.findOne({ _id: id, isDeleted: false })
    .populate('category', 'name')
    .populate('storage', 'code')
    .populate('createdBy updatedBy deletedBy', 'name');

  if (!product) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Produk'));
  }

  return product;
};

export const updateProduct = async (
  id: string,
  updateData: Partial<IProduct>,
  userId: Types.ObjectId
) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { ...updateData, updatedBy: userId },
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Produk'));
  }

  return product;
};

export const deleteProduct = async (id: string, userId: Types.ObjectId) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date(), deletedBy: userId },
    { new: true }
  );

  if (!product) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Produk'));
  }

  return product;
};
