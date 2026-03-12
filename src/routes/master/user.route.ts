import { Router } from 'express';
import * as userController from '../../controllers/master/user.controller';
import { validate } from '../../middlewares/validate';
import { createUserSchema } from '../../validations/master/user.validation';

const router = Router();

router.post('/', validate(createUserSchema), userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', validate(createUserSchema), userController.update);
router.delete('/:id', userController.remove);

export default router;
