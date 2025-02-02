"use client";

import { type getCategories } from "@/server/queries/categories";
import { parseAsInteger, useQueryStates } from "nuqs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      <ul className="flex w-full flex-wrap items-center gap-2 text-foreground-muted">
        <li>
          <Button
            role="link"
            variant="outline"
            onClick={() =>
              setQueryState(null, { shallow: false, history: "push" })
            }
            className={cn({
              "bg-primary text-primary-foreground": !queryState.category,
            })}
          >
            All Products
          </Button>
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            <Button
              role="link"
              variant="outline"
              onClick={() =>
                setQueryState(
                  { category: c.id, page: null },
                  { shallow: false, history: "push" },
                )
              }
              className={cn({
                "bg-primary text-primary-foreground":
                  queryState.category === c.id,
              })}
            >
              {c.name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Categories;
