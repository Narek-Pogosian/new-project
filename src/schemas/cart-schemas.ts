import { z } from "zod";

export const addCartSchema = z.object({
  quantity: z.number().positive().int(),
  productId: z.number(),
  cartId: z.number(),
  attributes: z.record(z.unknown()),
});

export const deleteCartSchema = z.object({
  cartItemId: z.number(),
});

export type AddCartType = z.infer<typeof addCartSchema>;
export type DeleteCartType = z.infer<typeof deleteCartSchema>;
