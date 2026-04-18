import { Request, Response, NextFunction } from 'express';
import * as productService from '../../service/master/product.service';
import { successResponse } from '../../utils/successResponse';
import { SUCCESS_MESSAGES } from '../../utils/message';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.createProduct(req.body, req.user._id);

    return successResponse(
      res,
      201,
      SUCCESS_MESSAGES.CREATED('Produk'),
      product
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
    const result = await productService.getAllProduct(req.query);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Produk'),
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
    const product = await productService.getProductById(id as string);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Produk'),
      product
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
    const product = await productService.updateProduct(
      id as string,
      req.body,
      req.user._id
    );

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.UPDATED('Produk'),
      product
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
    await productService.deleteProduct(id as string, req.user._id);
    return successResponse(res, 200, SUCCESS_MESSAGES.DELETED('Produk'));
  } catch (error) {
    next(error);
  }
};
