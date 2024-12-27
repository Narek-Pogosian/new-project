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
    <div className="lg:flex lg:gap-8">
      <div className="min-w-60 space-y-4 max-lg:hidden">
        <h3 className="mb-4 pt-4 text-sm uppercase tracking-wider text-foreground-muted">
          Categories
        </h3>
        <Categories categories={categories} currentCategory={data.category} />
        <h3 className="mb-4 pt-2 text-sm uppercase tracking-wider text-foreground-muted">
          Price filters
        </h3>
      </div>
      <div className="lg:hidden">
        <MobileFilters
          categories={categories}
          currentCategory={data.category}
        />
      </div>

      <div className="w-full">
        <div className="mb-4 flex justify-end border-b-2 border-accent-500/30 pb-4">
          <Sorting />
        </div>
        <Suspense
          fallback={<p>Loading products...</p>}
          key={Object.values(data).join("")}
        >
          <ProductList data={data} />
        </Suspense>
      </div>
    </div>
  );
}
