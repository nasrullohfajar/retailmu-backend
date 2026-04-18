import { Router } from 'express';
import * as productController from '../../controllers/master/product.controller';
import { validate } from '../../middlewares/validate';
import {
  createProductSchema,
  updateProductSchema,
} from '../../validations/master/product.validation';
import { protect } from '../../middlewares/auth.middleware';
import { restrictTo } from '../../middlewares/role.middleware';

const router = Router();

router.post(
  '/',
  protect,
  restrictTo('administrator'),
  validate(createProductSchema),
  productController.create
);

router.put(
  '/:id',
  protect,
  restrictTo('administrator'),
  validate(updateProductSchema),
  productController.update
);

router.delete(
  '/:id',
  protect,
  restrictTo('administrator'),
  productController.remove
);

router.get('/', protect, productController.getAll);
router.get('/:id', protect, productController.getById);

export default router;
