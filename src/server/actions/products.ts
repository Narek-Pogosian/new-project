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
  });

export const createProductAction = adminActionClient
  .schema(createProductSchema)
  .action(async ({ parsedInput }) => {
    const result = await db.$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: {
          poster: parsedInput.poster,
          description: parsedInput.description,
          name: parsedInput.name,
          slug: parsedInput.slug,
          price: parsedInput.price,
          categoryId: parsedInput.categoryId,
        },
      });

      const attributes = parsedInput.productAttributes.map((p) => ({
        ...p,
        productId: product.id,
      }));

      await prisma.productAttribute.createMany({
        data: attributes,
      });

      return {
        product,
        attributes,
      };
    });

    if (result) {
      revalidateDbCache("products");
    }
  });
