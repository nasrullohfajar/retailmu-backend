import { Request, Response, NextFunction } from 'express';
import * as supplierService from '../../service/master/supplier.service';
import { successResponse } from '../../utils/successResponse';
import { SUCCESS_MESSAGES } from '../../utils/message';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supplier = await supplierService.createSupplier(
      req.body,
      req.user._id
    );

    return successResponse(
      res,
      201,
      SUCCESS_MESSAGES.CREATED('Supplier'),
      supplier
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
    const result = await supplierService.getAllSupplier(req.query);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Supplier'),
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
    const supplier = await supplierService.getSupplierById(id as string);

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.FETCHED('Supplier'),
      supplier
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
    const supplier = await supplierService.updateSupplier(
      id as string,
      req.body,
      req.user._id
    );

    return successResponse(
      res,
      200,
      SUCCESS_MESSAGES.UPDATED('Supplier'),
      supplier
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
    await supplierService.deleteSupplier(id as string, req.user._id);

    return successResponse(res, 200, SUCCESS_MESSAGES.DELETED('Supplier'));
  } catch (error) {
    next(error);
  }
};
