"use server";

import { createCategorySchema } from "@/schemas/category-schemas";
import { adminActionClient } from ".";
import { revalidateDbCache } from "../queries/cache";
import { db } from "../db";
import { z } from "zod";

export const deleteCategoryAction = adminActionClient
  .schema(z.number())
  .action(async ({ parsedInput }) => {
    await db.category.delete({ where: { id: parsedInput } });
    revalidateDbCache({ tag: "categories" });
  });

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

    if (result) {
      revalidateDbCache({ tag: "categories" });
    }

    return result;
  });
