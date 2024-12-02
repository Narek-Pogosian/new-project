"use server";

import { createCategorySchema } from "@/schemas/category-schemas";
import { adminActionClient } from ".";

export const createCategoryAction = adminActionClient
  .schema(createCategorySchema)
  .action(async ({ parsedInput }) => {
    console.log("Not yet implemented", parsedInput);
    return;
  });
