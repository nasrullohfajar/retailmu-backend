import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import User from '../models/master/user.model';
import { ApiError } from '../utils/apiError';

// extend Request agar bisa menyimpan user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('cookies:', req.cookies);
    console.log('token:', req.cookies?.jwt);

    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, 'Silahkan login terlebih dahulu');
    }

    const secret = process.env.JWT_SECRET as Secret;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await User.findOne({ _id: decoded.id, isDeleted: false });

    if (!user) {
      throw new ApiError(401, 'Pengguna tidak ditemukan atau sudah dihapus');
    }

    req.user = user;
    next();
  } catch (error: any) {
    next(error);
  }
};
