import { db } from "../db";
import { dbCache } from "./cache";

function getCategoryInternal(id: number) {
  return db.category.findFirst({
    where: { id },
    include: { categoryAttributes: true },
  });
}

export async function getCategory(id: number) {
  const cacheFun = dbCache(getCategoryInternal, {
    tags: [`categories-${id}`],
  });

  return cacheFun(id);
}

function getCategoriesInternal() {
  return db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
      categoryAttributes: {
        select: {
          id: true,
          name: true,
          possibleValues: true,
        },
      },
    },
  });
}

export async function getCategories() {
  const cacheFunc = dbCache(getCategoriesInternal, {
    tags: ["categories"],
  });

  return cacheFunc();
}
