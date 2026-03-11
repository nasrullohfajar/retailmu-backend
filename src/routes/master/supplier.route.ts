import { Router } from 'express';
import * as supplierController from '../../controllers/master/supplier.controller';
import { validate } from '../../middlewares/validate';
import { createSupplierSchema } from '../../validations/master/supplier.validation';

const router = Router();

router.post('/', validate(createSupplierSchema), supplierController.create);
router.get('/', supplierController.getAll);
router.get('/:id', supplierController.getById);
router.put('/:id', validate(createSupplierSchema), supplierController.update);
router.delete('/:id', supplierController.remove);

export default router;
