import { db } from "../db";
import { dbCache } from "./cache";

function getProductBySlugInternal(slug: string) {
  return db.product.findFirst({ where: { slug } });
}

export async function getProductBySlug(slug: string) {
  const cacheFunc = dbCache(getProductBySlugInternal, {
    tags: [`products-${slug}}`],
  });

  return cacheFunc(slug);
}

function getProductsInternal() {
  return db.product.findMany();
}

export async function getProducts() {
  const cacheFunc = dbCache(getProductsInternal, {
    tags: ["products"],
  });

  return cacheFunc();
}
