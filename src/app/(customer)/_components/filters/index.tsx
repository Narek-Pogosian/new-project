"use client";

import { type getCategories } from "@/server/queries/categories";
import PriceSlider from "./price";
import Categories from "./categories";
import Attributes from "./attributes";
import Rating from "./rating";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
  currentCategory: string | undefined;
}

function Filters({ categories, currentCategory }: Props) {
  const categoryAttributes = categories.find((c) => c.slug === currentCategory);

  return (
    <div className="grid gap-7">
      <PriceSlider />

      <Categories categories={categories} />

      <Rating />

      {categoryAttributes && (
        <Attributes
          availableAttributes={categoryAttributes.categoryAttributes}
        />
      )}
    </div>
  );
}

export default Filters;
