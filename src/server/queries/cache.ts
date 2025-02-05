import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";

type CacheKey = keyof typeof CACHE_TAGS;
type ValidTags = CacheKey | `${CacheKey}-${string}`;

export const CACHE_TAGS = {
  products: "products",
  categories: "categories",
  categoriesWithProductCount: "categoriesWithProductCount",
  categoriesWithAttributes: "categoriesWithAttributes",
} as const;

type CacheCallback<T, A extends unknown[]> = (...args: A) => Promise<T>;

export function dbCache<T, A extends unknown[]>(
  cb: CacheCallback<T, A>,
  { tags }: { tags: ValidTags[] | undefined },
): CacheCallback<T, A> {
  return cache(unstable_cache(cb, undefined, { tags }));
}

export function revalidateDbCache(tag: ValidTags) {
  revalidateTag(tag);
}
