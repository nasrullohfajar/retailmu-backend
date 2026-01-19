import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../../service/master/category.service';
import { successResponse } from '../../utils/successResponse';
import { SUCCESS_MESSAGES } from '../../utils/message';

interface IdParam {
  id: string;
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.createCategory(req.body);

    return successResponse(
      res,
      201,
      SUCCESS_MESSAGES.CREATED('Kategori'),
      category
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
    const result = await categoryService.getAllCategories(req.query);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Kategori'),
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
    const category = await categoryService.getCategoryById(id as string);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Kategori'),
      category
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
    const category = await categoryService.updateCategory(
      id as string,
      req.body
    );

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.UPDATED('kategori'),
      category
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
    await categoryService.deleteCategory(id as string);
    return successResponse(res, 200, SUCCESS_MESSAGES.DELETED('Kategori'));
  } catch (error) {
    next(error);
  }
};
