import { z } from "zod";

const productAttribute = z.object({
  name: z.string(),
  values: z.array(z.string()).min(1),
});

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  slug: z.string().trim().min(1, { message: "Slug is required" }),
  poster: z.string().trim().min(1, { message: "Poster is required" }),
  description: z.string().trim().optional(),
  images: z.array(z.string()).optional(),
  productAttributes: z.array(productAttribute).min(1),
  categoryId: z.coerce.number(),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price must be greater than 0",
    }),
});

export type CreateProductsSchemaType = z.infer<typeof createProductSchema>;
