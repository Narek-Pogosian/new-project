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
    <ul className="w-full space-y-1">
      <li>
        <button
          role="link"
          onClick={() => handleNavigate()}
          className={cn("w-full rounded px-4 py-1 text-left", {
            "bg-black/5 dark:bg-white/10": !currentCategory,
          })}
        >
          All
        </button>
      </li>
      {categories.map((c) => (
        <li key={c.id}>
          <button
            role="link"
            onClick={() => handleNavigate(c.id)}
            className={cn("w-full rounded px-4 py-1 text-left", {
              "bg-black/5 dark:bg-white/10": currentCategory === c.id,
            })}
          >
            {c.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
