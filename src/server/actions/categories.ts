"use server";

import { createCategorySchema } from "@/schemas/category-schemas";
import { adminActionClient } from ".";
import { db } from "../db";

export const createCategoryAction = adminActionClient
  .schema(createCategorySchema)
  .action(async ({ parsedInput }) => {
    const result = await db.$transaction(async (prisma) => {
      const category = await prisma.category.create({
        data: {
          name: parsedInput.name,
          slug: parsedInput.slug,
          image: parsedInput.image,
          description: parsedInput.description,
        },
      });

      const attributesWithCategoryId = parsedInput.attributes
        ? parsedInput.attributes.map((attribute) => ({
            ...attribute,
            categoryId: category.id,
          }))
        : [];

      await prisma.categoryAttribute.createMany({
        data: attributesWithCategoryId,
      });

      return {
        category,
        categoryAttributes: attributesWithCategoryId,
      };
    });

    return result;
  });
