import { productQueryParams } from "@/schemas/product-schemas";
import { getCategories } from "@/server/queries/categories";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductList from "./_components/product-list";
import Categories from "./_components/categories";
import Sorting from "./_components/sorting";
import MobileFilters from "./_components/mobile-filters";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const search = await searchParams;
  const { data, success } = productQueryParams.safeParse(search);

  if (!success) {
    return redirect("/shop");
  }

  const categories = await getCategories();

  return (
    <>
      <div className="mb-4 flex justify-between gap-4 border-b-2 border-accent-500/30 pb-4">
        <div className="flex items-center gap-4 max-lg:hidden">
          <h3 className="mb-4 pt-4 text-sm uppercase tracking-wider text-foreground-muted">
            Categories
          </h3>
          <Categories categories={categories} currentCategory={data.category} />
        </div>
        <div className="lg:hidden">
          <MobileFilters
            categories={categories}
            currentCategory={data.category}
          />
        </div>
        <Sorting />
      </div>
      <Suspense
        fallback={<p>Loading products...</p>}
        key={Object.values(data).join("")}
      >
        <ProductList data={data} />
      </Suspense>
    </>
  );
}
