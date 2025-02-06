"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { type getCategories } from "@/server/queries/categories";
import { cn } from "@/lib/utils";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

function Categories({ categories }: Props) {
  const [queryState, setQueryState] = useQueryStates({
    page: parseAsInteger,
    category: parseAsString,
    attributes: parseAsString,
  });

  return (
    <nav aria-describedby="categories">
      <h3 className="mb-2 border-b pb-2 font-bold">Product Categories</h3>
      <ul className="space-y-2 text-foreground-muted">
        <li>
          <button
            role="link"
            onClick={() =>
              setQueryState(null, { shallow: false, history: "push" })
            }
            className={cn({
              "font-semibold text-foreground": !queryState.category,
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
                  { category: c.slug, page: null, attributes: null },
                  { shallow: false, history: "push" },
                )
              }
              className={cn({
                "font-semibold text-foreground": queryState.category === c.slug,
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
