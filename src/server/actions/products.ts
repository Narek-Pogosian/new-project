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
        }));

        await prisma.productAttribute.createMany({
          data: attributes,
        });

        const createdAttributes = await prisma.productAttribute.findMany({
          where: { productId: product.id },
          select: { id: true, name: true },
        });

        const productAttributeValues = [];
        for (const attr of parsedInput.productAttributes) {
          const createdAttr = createdAttributes.find(
            (a) => a.name === attr.name,
          );
          if (createdAttr) {
            productAttributeValues.push(
              ...attr.values.map((value) => ({
                value,
                productAttributeId: createdAttr.id,
              })),
            );
          }
        }

        if (productAttributeValues.length > 0) {
          await prisma.productAttributeValue.createMany({
            data: productAttributeValues,
          });
        }

        return {
          product,
          attributes: createdAttributes,
          attributeValues: productAttributeValues,
        };
      } catch (error) {
        console.log(error);
      }
    });

    if (result) {
      revalidateDbCache("products");
    }
  });
