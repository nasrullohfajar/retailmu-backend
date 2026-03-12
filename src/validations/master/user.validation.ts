import z from 'zod';
import { ERROR_MESSAGES } from '../../utils/message';

export const USER_ROLES = ['administrator', 'cashier', 'warehouse'] as const;

export const createUserSchema = z.object({
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

    name: z
      .string()
      .trim()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Nama pengguna', 2))
      .max(50, ERROR_MESSAGES.MAX_LENGTH('Nama pengguna', 50)),

    role: z.enum(USER_ROLES, {
      error: () => ({ message: ERROR_MESSAGES.INVALID('Role pengguna') }),
    }),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
