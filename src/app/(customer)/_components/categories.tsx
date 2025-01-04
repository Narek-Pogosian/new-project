"use client";

import { cn, getUpdatedSearchParams } from "@/lib/utils";
import { type getCategories } from "@/server/queries/categories";
import { useRouter } from "next/navigation";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
  currentCategory: number | undefined;
}

function Categories({ categories, currentCategory }: Props) {
  const router = useRouter();

  function handleNavigate(val?: number) {
    const r = getUpdatedSearchParams({ category: val });
    router.push(r);
  }

  return (
    <nav className="shrink-0" aria-label="categories">
      <ul className="flex w-full items-center gap-2 text-foreground-muted">
        <li>
          <button
            role="link"
            onClick={() => handleNavigate()}
            className={cn("w-full border-l-2 px-4 py-1 text-left", {
              "border-l-accent-500/50 text-foreground": !currentCategory,
            })}
          >
            All Products
          </button>
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            <button
              role="link"
              onClick={() => handleNavigate(c.id)}
              className={cn("w-full border-l-2 px-4 py-1 text-left", {
                "border-l-accent-500/50 text-foreground":
                  currentCategory === c.id,
              })}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Categories;
