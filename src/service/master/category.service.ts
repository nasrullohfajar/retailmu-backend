import { Types } from 'mongoose';
import Category, { ICategory } from '../../models/master/category.model';
import { ApiError } from '../../utils/apiError';
import { ERROR_MESSAGES } from '../../utils/message';

export const createCategory = async (
  categoryData: Partial<ICategory>,
  userId: Types.ObjectId
): Promise<ICategory> => {
  // cek apakah data sudah ada tapi terhapus
  const deletedCategory = await Category.findOne({
    code: categoryData.code,
    isDeleted: true,
  });

  // jika ada, restore data tersebut
  if (deletedCategory) {
    const restored = await Category.findByIdAndUpdate(
      deletedCategory._id,
      {
        ...categoryData,
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
        updatedBy: userId,
      },
      { new: true }
    );

    if (!restored) {
      throw new ApiError(500, 'Gagal mengembalikan kategori');
    }

    return restored;
  }

  return await Category.create({ ...categoryData, createdBy: userId });
};

export const getAllCategories = async (query: any) => {
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
    ];
  }

  const [data, total] = await Promise.all([
    Category.find(filter)
      .populate('createdBy updatedBy deletedBy', 'name')
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limitNum),

    Category.countDocuments(filter),
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

export const getCategoryById = async (id: string) => {
  const category = await Category.findOne({
    _id: id,
    isDeleted: false,
  }).populate('createdBy updatedBy deletedBy', 'name');

  if (!category) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Kategori'));
  }

  return category;
};

export const updateCategory = async (
  id: string,
  updateData: Partial<ICategory>,
  userId: Types.ObjectId
) => {
  const category = await Category.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { ...updateData, userId },
    { new: true, runValidators: true }
  );

  if (!category) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Kategori'));
  }

  return category;
};

export const deleteCategory = async (id: string, userId: Types.ObjectId) => {
  const category = await Category.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date(), userId },
    { new: true }
  );

  if (!category) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Kategori'));
  }

  return category;
};
