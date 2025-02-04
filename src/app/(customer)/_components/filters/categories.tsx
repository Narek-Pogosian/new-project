"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { type getCategories } from "@/server/queries/categories";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

function Categories({ categories }: Props) {
  const [queryState, setQueryState] = useQueryStates({
    page: parseAsInteger,
    category: parseAsString,
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
                  { category: c.slug, page: null },
                  { shallow: false, history: "push" },
                )
              }
              className={cn({
                "bg-primary text-primary-foreground":
                  queryState.category === c.slug,
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
