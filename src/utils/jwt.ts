import type { IUser } from '../models/master/user.model';
import jwt, { Secret } from 'jsonwebtoken';
import { Response } from 'express';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error('JWT_SECRET or JWT_EXPIRES_IN missing');
  }

  return jwt.sign({ id }, secret as Secret, { expiresIn: expiresIn as any });
};

export const generateCookie = (
  statusCode: number,
  user: IUser,
  res: Response
) => {
  const token = generateToken(user._id.toString());

  const cookie = {
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  };

  res.cookie('jwt', token, cookie);
  user.password = undefined as unknown as string;

  res.status(statusCode).json({
    success: true,
    message: 'Login berhasil',
    data: { user },
  });
};
