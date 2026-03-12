import { Request, Response, NextFunction } from 'express';
import * as userService from '../../service/master/user.service';
import { successResponse } from '../../utils/successResponse';
import { SUCCESS_MESSAGES } from '../../utils/message';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    const response = user.toObject();
    delete response.password;

    return successResponse(
      res,
      201,
      SUCCESS_MESSAGES.CREATED('Pengguna'),
      response
    );
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.getAllUser(req.query);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Pengguna'),
      result
    );
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id as string);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Pengguna'),
      user
    );
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id as string, req.body);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.UPDATED('Pengguna'),
      user
    );
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id as string);

    return successResponse(res, 200, SUCCESS_MESSAGES.DELETED('Pengguna'));
  } catch (error) {
    next(error);
  }
};
