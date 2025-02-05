"use server";

import { createProductSchema } from "@/schemas/product-schemas";
import { adminActionClient } from ".";
import { revalidateDbCache } from "../queries/cache";
import { db } from "../db";
import { z } from "zod";

export const deleteProductAction = adminActionClient
  .schema(z.number())
  .action(async ({ parsedInput }) => {
    await db.product.delete({ where: { id: parsedInput } });

    revalidateDbCache("products");
    revalidateDbCache("categoriesWithProductCount");
  });

export const createProductAction = adminActionClient
  .schema(createProductSchema)
  .action(async ({ parsedInput }) => {
    const result = await db.$transaction(async (prisma) => {
      try {
        const product = await prisma.product.create({
          data: {
            poster: parsedInput.poster,
            description: parsedInput.description,
            name: parsedInput.name,
            slug: parsedInput.slug,
            price: parsedInput.price,
            categorySlug: parsedInput.categorySlug,
          },
        });

        const attributes = parsedInput.productAttributes.map((p) => ({
          name: p.name,
          productId: product.id,
          values: p.values,
        }));

        await prisma.productAttribute.createMany({
          data: attributes,
        });

        return {
          product,
        };
      } catch (error) {
        console.log(error);
      }
    });

    if (result) {
      revalidateDbCache("products");
    }
  });
