import z from 'zod';
import { ERROR_MESSAGES } from '../../utils/message';

export const createCategorySchema = z.object({
  body: z.object({
    code: z
      .string()
      .trim()
      .uppercase()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Kode kategori', 2))
      .max(10, ERROR_MESSAGES.MAX_LENGTH('Kode kategori', 10)),

    name: z
      .string()
      .trim()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Nama kategori', 2))
      .max(50, ERROR_MESSAGES.MAX_LENGTH('Nama kategori', 50)),

    description: z
      .string()
      .trim()
      .max(255, ERROR_MESSAGES.MAX_LENGTH('Deskripsi kategori', 255))
      .optional()
      .or(z.literal('')),
  }),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>['body'];
