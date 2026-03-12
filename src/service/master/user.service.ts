import bcrypt from 'bcryptjs';
import User, { IUser } from '../../models/master/user.model';
import { ApiError } from '../../utils/apiError';
import { ERROR_MESSAGES } from '../../utils/message';

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }

  return await User.create(userData);
};

export const getAllUser = async (query: any) => {
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
    filter.username = { $regex: search, $options: 'i' };
    filter.name = { $regex: search, $options: 'i' };
  }

  const [data, total] = await Promise.all([
    User.find(filter)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limitNum),

    User.countDocuments(filter),
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

export const getUserById = async (id: string) => {
  const user = await User.findOne({ _id: id, isDeleted: false });
  if (!user) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Pengguna'));
  }

  return user;
};

export const updateUser = async (id: string, updateData: Partial<IUser>) => {
  const user = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Pengguna'));
  }

  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, ERROR_MESSAGES.NOTFOUND('Pengguna'));
  }

  return user;
};
