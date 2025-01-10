"use client";

import { type getCategories } from "@/server/queries/categories";
import { parseAsInteger, useQueryStates } from "nuqs";
import { cn } from "@/lib/utils";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

function Categories({ categories }: Props) {
  const [queryState, setQueryState] = useQueryStates({
    page: parseAsInteger,
    category: parseAsInteger,
  });

  return (
    <nav className="shrink-0" aria-label="categories">
      <ul className="flex w-full items-center gap-2 text-foreground-muted">
        <li>
          <button
            role="link"
            onClick={() =>
              setQueryState(null, { shallow: false, history: "push" })
            }
            className={cn("w-full border-l-2 px-4 py-1 text-left", {
              "border-l-accent-500/50 text-foreground": !queryState.category,
            })}
          >
            All Products
          </button>
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            <button
              role="link"
              onClick={() =>
                setQueryState(
                  { category: c.id, page: null },
                  { shallow: false, history: "push" },
                )
              }
              className={cn("w-full border-l-2 px-4 py-1 text-left", {
                "border-l-accent-500/50 text-foreground":
                  queryState.category === c.id,
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
