import { z } from "zod";

export const reviewSchema = z.object({
  productId: z.number().min(1, { message: "ProductId is required" }),
  comment: z.string().trim().optional(),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
