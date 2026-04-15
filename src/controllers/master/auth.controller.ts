import { Request, Response, NextFunction } from 'express';
import { loginService } from '../../service/master/auth.service';
import { generateCookie } from '../../utils/jwt';
import { successResponse } from '../../utils/successResponse';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await loginService(username, password);

    generateCookie(200, user, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('token');
    return successResponse(res, 200, 'Logout berhasil');
  } catch (error) {
    next(error);
  }
};
