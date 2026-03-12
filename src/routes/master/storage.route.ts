import { Router } from 'express';
import * as storageController from '../../controllers/master/storage.controller';
import { validate } from '../../middlewares/validate';
import { createStorageSchema } from '../../validations/master/storage.validation';

const router = Router();

router.post('/', validate(createStorageSchema), storageController.create);
router.get('/', storageController.getAll);
router.get('/:id', storageController.getById);
router.put('/:id', validate(createStorageSchema), storageController.update);
router.delete('/:id', storageController.remove);

export default router;
