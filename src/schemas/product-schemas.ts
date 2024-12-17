import { z } from "zod";

const productAttribute = z.object({
  name: z.string(),
  values: z.array(z.string()).min(1),
});

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  slug: z.string().trim().min(1, { message: "Slug is required" }),
  poster: z.string().trim().min(1, { message: "Poster is required" }).url(),
  description: z.string().trim().min(1, { message: "Description is required" }),
  images: z.array(z.string()).optional(),
  productAttributes: z.array(productAttribute).min(1),
  categoryId: z.coerce.number().min(1, { message: "Categery is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price must be a number greater than 0",
    }),
});

export const productQueryParams = z.object({
  category: z.coerce.number().optional(),
  min_price: z.coerce.number().optional(),
  max_price: z.coerce.number().optional(),
  min_rating: z.coerce.number().optional(),
  sort_by: z.string().optional(),
  dir: z.enum(["asc", "desc"]).optional(),
});

export type CreateProductsSchemaType = z.infer<typeof createProductSchema>;
export type ProductQueryParamsType = z.infer<typeof productQueryParams>;
