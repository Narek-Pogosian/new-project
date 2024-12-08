import { db } from "../db";
import { dbCache } from "./cache";

function getProductsInternal() {
  return db.product.findMany();
}

export async function getProducts() {
  const cacheFunc = dbCache(getProductsInternal, {
    tags: ["products"],
  });

  return cacheFunc();
}
