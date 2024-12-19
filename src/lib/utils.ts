import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function setSearchQueries(
  values: Record<string, null | string | number | Array<number | string>>,
) {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(values).forEach(([key, value]) => {
    if (!value) {
      searchParams.delete(key);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value.join(","));
      }
    } else {
      searchParams.set(key, value.toString());
    }
  });

  return `${window.location.pathname}?${searchParams.toString()}`;
}
