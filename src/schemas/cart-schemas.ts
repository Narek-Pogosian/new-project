import { z } from "zod";

export const addCartSchema = z.object({
  quantity: z.number().positive().int(),
  productId: z.number(),
  cartId: z.number(),
  attributes: z.record(z.unknown()),
});

export type AddCartType = z.infer<typeof addCartSchema>;
