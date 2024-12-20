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

export function getUpdatedSearchParams(key: string, value?: string | number) {
  const searchParams = new URLSearchParams(window.location.search);

  if (value) {
    searchParams.set(key, value.toString());
  } else {
    searchParams.delete(key);
  }

  return `${window.location.pathname}?${searchParams.toString()}`;
}
