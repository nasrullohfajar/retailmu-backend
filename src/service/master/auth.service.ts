import bcrypt from 'bcryptjs';
import User from '../../models/master/user.model';
import { ApiError } from '../../utils/apiError';

export const loginService = async (username: string, password: string) => {
  const user = await User.findOne({ username, isDeleted: false }).select(
    '+password'
  );

  if (!user) {
    throw new ApiError(401, 'Username atau password salah');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Username atau password salah');
  }

  return user;
};
