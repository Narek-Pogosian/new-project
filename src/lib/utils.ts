import { type CategoryAttribute } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { type Attribute } from "@/schemas/product-schemas";
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

export function getTotalPrice<
  T extends { quantity: number; product: { price: number } },
>(arr: T[]) {
  return arr.reduce((acc, curr) => acc + curr.quantity * curr.product.price, 0);
}

export function formatPrice(amount: number, { showZeroAsNumber = false } = {}) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });

  if (amount === 0 && !showZeroAsNumber) return "Free";
  return formatter.format(amount);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseAttributes(str: string): Attribute | undefined {
  const [name, values] = str.split(":");
  return name && values ? { name, values: values.split(",") } : undefined;
}

export function parseAttributesFromParams(
  attributesFromParams: string[],
  availableAttributes: CategoryAttribute[],
) {
  const initialAttributes = availableAttributes.reduce(
    (acc, { name }) => {
      acc[name] = [];
      return acc;
    },
    {} as Record<string, string[]>,
  );

  attributesFromParams.forEach((attr) => {
    const parsed = parseAttributes(attr);
    if (parsed) {
      initialAttributes[parsed.name] = parsed.values;
    }
  });

  return initialAttributes;
}
