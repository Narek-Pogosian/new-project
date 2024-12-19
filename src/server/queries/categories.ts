import { db } from "../db";
import { dbCache } from "./cache";

/**
 * ***** CATEGORY ******
 */
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

/**
 * ***** CATEGORIES ******
 */
function getCategoriesInternal() {
  return db.category.findMany({ orderBy: { name: "asc" } });
}

export async function getCategories() {
  const cacheFunc = dbCache(getCategoriesInternal, {
    tags: ["categories"],
  });

  return cacheFunc();
}

/**
 * ***** CATEGORIES WITH PRODUCT COUNT ******
 */
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

/**
 * ***** CATEGORIES WITH ATTRIBUTES ******
 */
function getCategoriesWithAttributesInternal() {
  return db.category.findMany({
    include: {
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

export function getCategoriesWithAttributes() {
  const cacheFunc = dbCache(getCategoriesWithAttributesInternal, {
    tags: ["categories", "categoriesWithAttributes"],
  });

  return cacheFunc();
}
