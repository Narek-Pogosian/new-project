import { z } from "zod";

const categoryAttribute = z.object({
  name: z.string(),
  possibleValues: z.array(z.string().trim().min(1, { message: "Required" })),
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  slug: z.string().trim().min(1, { message: "Slug is required" }),
  image: z.string().trim().optional(),
  description: z.string().trim().optional(),
  attributes: z.array(categoryAttribute).optional(),
});

export type CreateCategorySchemaType = z.infer<typeof createCategorySchema>;
