import z from 'zod';
import { ERROR_MESSAGES } from '../../utils/message';

export const createProductSchema = z.object({
  body: z.object({
    code: z
      .string({ error: ERROR_MESSAGES.REQUIRED('Kode produk') })
      .trim()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Kode produk', 2))
      .max(10, ERROR_MESSAGES.MAX_LENGTH('Kode produk', 10)),

    name: z
      .string({ error: ERROR_MESSAGES.REQUIRED('Nama produk') })
      .trim()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Nama produk', 2))
      .max(50, ERROR_MESSAGES.MAX_LENGTH('Nama produk', 50)),

    category: z.string({ error: ERROR_MESSAGES.REQUIRED('Kategori produk') }),

    storage: z.string({ error: ERROR_MESSAGES.REQUIRED('Lokasi penyimpanan') }),

    price: z.coerce // konversi string ke number
      .number()
      .min(0, ERROR_MESSAGES.MIN_NUMBER('Harga produk', 0))
      .max(100000000, ERROR_MESSAGES.MAX_NUMBER('Harga produk', 100000000)),
  }),
});

export const updateProductSchema = z.object({
  body: createProductSchema.shape.body.partial(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>['body'];
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];
