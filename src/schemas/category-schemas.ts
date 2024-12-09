import { z } from "zod";

const categoryAttribute = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  possibleValues: z.array(
    z.string().trim().min(1, { message: "A value cannot be empty" }),
  ),
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  slug: z.string().trim().min(1, { message: "Slug is required" }),
  image: z.string().trim().min(1, { message: "Image is required" }),
  description: z.string().trim().optional(),
  attributes: z.array(categoryAttribute).min(1),
});

export type CreateCategorySchemaType = z.infer<typeof createCategorySchema>;
