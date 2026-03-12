import { Request, Response, NextFunction } from 'express';
import * as storageService from '../../service/master/storage.service';
import { successResponse } from '../../utils/successResponse';
import { SUCCESS_MESSAGES } from '../../utils/message';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storage = await storageService.createStorage(req.body);

    return successResponse(
      res,
      201,
      SUCCESS_MESSAGES.CREATED('Penyimpanan'),
      storage
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
    const result = await storageService.getAllStorage(req.query);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Penyimpanan'),
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
    const storage = await storageService.getStorageById(id as string);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Penyimpanan'),
      storage
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
    const storage = await storageService.updateStorage(id as string, req.body);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.UPDATED('Penyimpanan'),
      storage
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
    await storageService.deleteStorage(id as string);

    return successResponse(res, 200, SUCCESS_MESSAGES.DELETED('Penyimpanan'));
  } catch (error) {
    next(error);
  }
};
