import Category, { ICategory } from '../../models/master/category.model';
import { ApiError } from '../../utils/apiError';
import { ERROR_MESSAGES } from '../../utils/message';

export const createCategory = async (
  categoryData: Partial<ICategory>
): Promise<ICategory> => {
  return await Category.create(categoryData);
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
    filter.name = { $regex: search, $options: 'i' };
  }

  const [data, total] = await Promise.all([
    Category.find(filter)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limitNum),

    Category.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    categories: data,
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
  const category = await Category.findOne({ _id: id, isDeleted: false });
  if (!category) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Kategori'));
  }

  return category;
};

export const updateCategory = async (
  id: string,
  updateData: Partial<ICategory>
) => {
  const category = await Category.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true, runValidators: true }
  );

  if (!category) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Kategori'));
  }

  return category;
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!category) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Kategori'));
  }

  return category;
};
