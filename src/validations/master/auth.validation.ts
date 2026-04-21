import z from 'zod';
import { ERROR_MESSAGES } from '../../utils/message';

export const createAuthSchema = z.object({
  body: z.object({
    username: z.string().trim().min(1, ERROR_MESSAGES.REQUIRED('Username')),
    password: z.string().trim().min(1, ERROR_MESSAGES.REQUIRED('Password')),
  }),
});

export type CreateAuthInput = z.infer<typeof createAuthSchema>['body'];
