import { z } from "zod";

const productAttribute = z.object({
  name: z.string(),
  value: z.string(),
  quantity: z.coerce.number(),
});

const image = z.object({
  url: z.string().trim().min(1, { message: "Image url is required" }),
});

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  slug: z.string().trim().min(1, { message: "Slug is required" }),
  poster: z.string().trim().min(1, { message: "Poster is required" }),
  description: z.string().trim().optional(),
  price: z.coerce.number().min(0),
  images: z.array(image),
  categoryId: z.coerce.number(),
  productAttributes: z.array(productAttribute).min(1),
});

export type CreateProductsSchemaType = z.infer<typeof createProductSchema>;
