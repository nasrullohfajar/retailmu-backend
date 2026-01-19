import { Router } from 'express';
import * as categoryController from '../../controllers/master/category.controller';
import { validate } from '../../middlewares/validate';
import { createCategorySchema } from '../../validations/master/category.validation';

const router = Router();

router.post('/', validate(createCategorySchema), categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.put('/:id', validate(createCategorySchema), categoryController.update);
router.delete('/:id', categoryController.remove);

export default router;
