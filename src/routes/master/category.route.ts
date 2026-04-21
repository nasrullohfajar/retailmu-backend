import { Router } from 'express';
import * as categoryController from '../../controllers/master/category.controller';
import { validate } from '../../middlewares/validate';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../../validations/master/category.validation';
import { protect } from '../../middlewares/auth.middleware';
import { restrictTo } from '../../middlewares/role.middleware';

const router = Router();

router.post(
  '/',
  protect,
  restrictTo('administrator'),
  validate(createCategorySchema),
  categoryController.create
);

router.put(
  '/:id',
  protect,
  restrictTo('administrator'),
  validate(updateCategorySchema),
  categoryController.update
);

router.delete(
  '/:id',
  protect,
  restrictTo('administrator'),
  categoryController.remove
);

router.get('/', protect, categoryController.getAll);
router.get('/:id', protect, categoryController.getById);

export default router;
