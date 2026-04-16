import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      throw new ApiError(403, 'Anda tidak memiliki akses');
    }

    next();
  };
};
