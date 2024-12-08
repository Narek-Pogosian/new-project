import { db } from "../db";
import { dbCache } from "./cache";

function getCategoriesInternal() {
  return db.category.findMany();
}

export async function getCategories() {
  const cacheFunc = dbCache(getCategoriesInternal, {
    tags: ["categories"],
  });

  return cacheFunc();
}

function getCategoriesWithProductsCountInternal() {
  return db.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
}

export function getCategoriesWithProductsCount() {
  const cacheFunc = dbCache(getCategoriesWithProductsCountInternal, {
    tags: ["categories", "categoriesWithProductCount"],
  });

  return cacheFunc();
}

function getCategoryInternal(id: number) {
  return db.category.findFirst({ where: { id } });
}

export async function getCategory(id: number) {
  const cacheFun = dbCache(getCategoryInternal, {
    tags: [`categories-${id}`],
  });

  return cacheFun(id);
}
