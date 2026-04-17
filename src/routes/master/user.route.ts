import { Router } from 'express';
import * as userController from '../../controllers/master/user.controller';
import { validate } from '../../middlewares/validate';
import { createUserSchema } from '../../validations/master/user.validation';
import { protect } from '../../middlewares/auth.middleware';
import { restrictTo } from '../../middlewares/role.middleware';

const router = Router();

router.post(
  '/',
  protect,
  restrictTo('administrator'),
  validate(createUserSchema),
  userController.create
);

router.put(
  '/:id',
  protect,
  restrictTo('administrator'),
  validate(createUserSchema),
  userController.update
);

router.delete(
  '/:id',
  protect,
  restrictTo('administrator'),
  userController.remove
);

router.get('/', protect, restrictTo('administrator'), userController.getAll);
router.get('/me', protect, userController.me);
router.get(
  '/:id',
  protect,
  restrictTo('administrator'),
  userController.getById
);

export default router;
