import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import { dbCache } from "./cache";
import { db } from "../db";

/**
 * PRODUCT
 */
function getProductBySlugInternal(slug: string) {
  return db.product.findFirst({ where: { slug } });
}

export async function getProductBySlug(slug: string) {
  const cacheFunc = dbCache(getProductBySlugInternal, {
    tags: [`products-${slug}}`],
  });

  return cacheFunc(slug);
}

/**
 * ALL PRODUCT
 */
function getProductsInternal() {
  return db.product.findMany();
}

export async function getProducts() {
  const cacheFunc = dbCache(getProductsInternal, {
    tags: ["products"],
  });

  return cacheFunc();
}

/**
 * DISCOVER PRODUCT
 */
function discoverProductsInternal(queryOptions: ProductQueryParamsType) {
  const {
    category,
    min_price,
    max_price,
    min_rating,
    page = 1,
    sort_by = "name",
    dir = "asc",
  } = queryOptions;

  const where: {
    categoryId?: number;
    price?: {
      gte?: number;
      lte?: number;
    };
    rating?: {
      gte?: number;
    };
  } = {};

  if (category !== undefined) {
    where.categoryId = category;
  }

  if (min_price !== undefined || max_price !== undefined) {
    where.price = {};

    if (min_price !== undefined) {
      where.price.gte = min_price;
    }

    if (max_price !== undefined) {
      where.price.lte = max_price;
    }
  }

  if (min_rating !== undefined) {
    where.rating = { gte: min_rating };
  }

  const take = 10;
  const skip = (page - 1) * take;
  const orderBy = sort_by ? { [sort_by]: dir } : undefined;

  const totalCountPromise = db.product.count({
    where,
  });

  const productsPromise = db.product.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  return Promise.all([totalCountPromise, productsPromise]).then(
    ([totalCount, products]) => {
      const totalPages = Math.ceil(totalCount / take);
      return {
        products,
        totalPages,
        currentPage: page,
      };
    },
  );
}

export async function discoverProducts(queryOptions: ProductQueryParamsType) {
  const cacheFunc = dbCache(discoverProductsInternal, {
    tags: ["products", `products-${Object.values(queryOptions).join("")}`],
  });

  return cacheFunc(queryOptions);
}
