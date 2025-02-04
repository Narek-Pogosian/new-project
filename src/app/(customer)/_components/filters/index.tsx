"use client";

import { type getCategories } from "@/server/queries/categories";
import Categories from "./categories";
import PriceSlider from "./price";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

function Filters({ categories }: Props) {
  return (
    <div className="space-y-8">
      <PriceSlider />
      <Categories categories={categories} />
    </div>
  );
}

export default Filters;
