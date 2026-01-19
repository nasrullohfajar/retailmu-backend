import z from 'zod';
import { ERROR_MESSAGES } from '../../utils/message';

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Nama kategori', 2))
      .max(50, ERROR_MESSAGES.MAX_LENGTH('Nama kategori', 50)),

    description: z
      .string()
      .trim()
      .max(200, ERROR_MESSAGES.MAX_LENGTH('Nama kategori', 200))
      .optional()
      .or(z.literal('')),
  }),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>['body'];
