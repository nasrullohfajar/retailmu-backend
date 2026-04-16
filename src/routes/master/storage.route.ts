import { Router } from 'express';
import * as storageController from '../../controllers/master/storage.controller';
import { validate } from '../../middlewares/validate';
import { createStorageSchema } from '../../validations/master/storage.validation';
import { protect } from '../../middlewares/auth.middleware';
import { restrictTo } from '../../middlewares/role.middleware';

const router = Router();

router.post(
  '/',
  protect,
  restrictTo('administrator'),
  validate(createStorageSchema),
  storageController.create
);

router.put(
  '/:id',
  protect,
  restrictTo('administrator'),
  validate(createStorageSchema),
  storageController.update
);

router.delete(
  '/:id',
  protect,
  restrictTo('administrator'),
  storageController.remove
);

router.get('/', protect, storageController.getAll);
router.get('/:id', protect, storageController.getById);

export default router;
