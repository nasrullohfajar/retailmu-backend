import z from 'zod';
import { ERROR_MESSAGES } from '../../utils/message';

export const createStorageSchema = z.object({
  body: z.object({
    code: z
      .string()
      .trim()
      .uppercase({ error: ERROR_MESSAGES.UPPERCASE('Kode penyimpanan') })
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Kode penyimpanan', 2))
      .max(10, ERROR_MESSAGES.MAX_LENGTH('Kode penyimpanan', 10)),

    description: z
      .string()
      .trim()
      .max(255, ERROR_MESSAGES.MAX_LENGTH('Deskripsi penyimpanan', 255))
      .optional()
      .or(z.literal('')),
  }),
});

export type CreateStorageInput = z.infer<typeof createStorageSchema>['body'];
