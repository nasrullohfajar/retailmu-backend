import { Router } from 'express';
import { login, logout } from '../../controllers/master/auth.controller';
import { validate } from '../../middlewares/validate';
import { createAuthSchema } from '../../validations/master/auth.validation';

const router = Router();

router.post('/login', validate(createAuthSchema), login);
router.post('/logout', logout);

export default router;
