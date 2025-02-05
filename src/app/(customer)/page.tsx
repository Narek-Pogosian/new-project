import { productQueryParams } from "@/schemas/product-schemas";
import { getCategories } from "@/server/queries/categories";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductList, { ProductsSkeleton } from "./_components/product-list";
import MobileFilters from "./_components/mobile-filters";
import Sorting from "./_components/sorting";
import Filters from "./_components/filters";
import SearchBox from "./_components/searchbox";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const search = await searchParams;

  const { data, success } = productQueryParams.safeParse(search);

  if (!success) {
    return redirect("/");
  }

  const categories = await getCategories();

  return (
    <>
      <div className="flex gap-12">
        <div className="w-[350px] max-lg:hidden">
          <Filters categories={categories} />
        </div>
        <div className="w-full">
          <div className="mb-4 flex justify-between">
            <div>
              <div className="lg:hidden">
                <MobileFilters categories={categories} />
              </div>
              <div className="max-lg:hidden">
                <SearchBox />
              </div>
            </div>
            <Sorting />
          </div>
          <Suspense
            fallback={<ProductsSkeleton />}
            key={Object.values(data).join("")}
          >
            <ProductList searchParams={data} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
