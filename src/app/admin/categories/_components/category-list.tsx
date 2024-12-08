"use client";

import { type getCategoriesWithProductsCount } from "@/server/queries/categories";
import { FileQuestion, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import CategoryActions from "./category-actions";

interface Props {
  categories: Awaited<ReturnType<typeof getCategoriesWithProductsCount>>;
}

function CategoryList({ categories }: Props) {
  const [nameQuery, setNameQuery] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesName = category.name
        .toLowerCase()
        .includes(nameQuery.trim().toLowerCase());
      return matchesName;
    });
  }, [categories, nameQuery]);

  return (
    <>
      <div className="mb-8 flex justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground-placeholder" />
          <Input
            id="title"
            aria-label="Title"
            placeholder="Search categories..."
            className="pl-9 text-sm shadow-sm"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/admin/categories/create">Create category</Link>
        </Button>
      </div>

      <hr className="mb-6" />

      {filteredCategories.length === 0 ? (
        <div className="mx-auto mb-8 pt-16 text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
            <FileQuestion className="size-10 text-primary" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Oops! No Results</h2>
          <p className="text-sm text-foreground-muted">
            Try adjusting your filters to find categories!
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {filteredCategories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between gap-2 [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:pb-6"
            >
              <div className="flex gap-6">
                <div>Image</div>
                <div>
                  <h3 className="mb-1 font-semibold">{category.name}</h3>
                  <p className="mb-2 text-xs text-foreground-muted">
                    Created: {new Date(category.createdAt).toDateString()}
                  </p>
                  <p className="text-sm font-medium text-foreground-muted">
                    {category._count.products} products
                  </p>
                  <p></p>
                </div>
              </div>
              <CategoryActions categoryId={category.id} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CategoryList;
