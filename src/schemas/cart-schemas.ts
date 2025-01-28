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

export const updateQuantitySchema = z.object({
  cartItemId: z.number(),
  quantity: z.number().positive().int(),
});

export type AddCartType = z.infer<typeof addCartSchema>;
export type DeleteCartType = z.infer<typeof deleteCartSchema>;
export type UpdateQuantityType = z.infer<typeof updateQuantitySchema>;
