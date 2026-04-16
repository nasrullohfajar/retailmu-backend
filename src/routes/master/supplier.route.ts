import { Router } from 'express';
import * as supplierController from '../../controllers/master/supplier.controller';
import { validate } from '../../middlewares/validate';
import { createSupplierSchema } from '../../validations/master/supplier.validation';
import { protect } from '../../middlewares/auth.middleware';
import { restrictTo } from '../../middlewares/role.middleware';

const router = Router();

router.post(
  '/',
  protect,

  validate(createSupplierSchema),
  supplierController.create
);

router.put(
  '/:id',
  protect,
  restrictTo('administrator'),
  validate(createSupplierSchema),
  supplierController.update
);

router.delete(
  '/:id',
  protect,
  restrictTo('administrator'),
  supplierController.remove
);

router.get('/', protect, supplierController.getAll);
router.get('/:id', protect, supplierController.getById);

export default router;
