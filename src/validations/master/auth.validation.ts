import z from 'zod';
import { ERROR_MESSAGES } from '../../utils/message';

export const createAuthSchema = z.object({
  body: z.object({
    username: z
      .string()
      .trim()
      .lowercase()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Username', 2))
      .max(25, ERROR_MESSAGES.MAX_LENGTH('Username', 25)),

    password: z
      .string()
      .trim()
      .min(6, ERROR_MESSAGES.MIN_LENGTH('Password', 6))
      .max(255, ERROR_MESSAGES.MAX_LENGTH('Password', 255)),
  }),
});

export type CreateAuthInput = z.infer<typeof createAuthSchema>['body'];
