import { db } from "../db";
import { dbCache } from "./cache";

export const getAllCategories = dbCache(
  () => {
    return db.category.findMany();
  },
  { tags: ["global:categories"] },
);
