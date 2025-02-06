import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import { dbCache } from "./cache";
import { db } from "../db";

function getProductBySlugInternal(slug: string) {
  return db.product.findFirst({
    where: { slug },
    include: {
      productAttributes: {
        select: { name: true, id: true, values: true },
      },
      reviews: true,
    },
  });
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

async function discoverProductsInternal(queryOptions: ProductQueryParamsType) {
  const {
    category,
    min_price,
    max_price,
    min_rating,
    page = 1,
    sort_by = "createdAt",
    dir = "desc",
    query,
    attributes,
  } = queryOptions;

  const where: {
    categorySlug?: string;
    price?: {
      gte?: number;
      lte?: number;
    };
    rating?: {
      gte?: number;
    };
    name?: {
      contains?: string;
      mode?: "insensitive";
    };
  } = {};

  if (query !== undefined) {
    where.name = {
      contains: query,
      mode: "insensitive",
    };
  }

  if (category !== undefined) {
    where.categorySlug = category;
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

  if (attributes) {
    const whereConditions = attributes.map((attribute) => ({
      productAttributes: {
        some: {
          AND: [
            { name: attribute.name },
            { values: { hasEvery: attribute.values } },
          ],
        },
      },
    }));

    // @ts-expect-error it works
    where.AND = whereConditions;
  }

  const take = 12;
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
  if (
    queryOptions.query ||
    queryOptions.max_price ||
    queryOptions.min_price ||
    queryOptions.attributes
  ) {
    return discoverProductsInternal(queryOptions);
  }

  const cacheFunc = dbCache(discoverProductsInternal, {
    tags: [
      "products",
      `products-${Object.values(queryOptions).sort().join("")}`,
    ],
  });

  return cacheFunc(queryOptions);
}
