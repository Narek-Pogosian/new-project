import { z } from "zod";

export const createOrderSchema = z.array(
  z.object({
    quantity: z.number().positive().int(),
    productId: z.number(),
    cartId: z.number(),
    attributes: z.unknown(),
  }),
);

export type CreateOrderType = z.infer<typeof createOrderSchema>;
