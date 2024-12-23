import { productQueryParams } from "@/schemas/product-schemas";
import { getCategories } from "@/server/queries/categories";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductList from "./_components/product-list";
import Categories from "./_components/categories";
import Sorting from "./_components/sorting";

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

  return (
    <div className="flex gap-8">
      <div className="min-w-60 space-y-4">
        <h3 className="mb-4 pt-4 text-sm uppercase tracking-wider text-foreground-muted">
          Categories
        </h3>
        <Suspense fallback={<p>Loading categories...</p>}>
          <CategoriesServerWrapper current={data.category} />
        </Suspense>
        <h3 className="mb-4 pt-2 text-sm uppercase tracking-wider text-foreground-muted">
          Price filters
        </h3>
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

async function CategoriesServerWrapper({
  current,
}: {
  current: number | undefined;
}) {
  const res = await getCategories();

  return <Categories categories={res} currentCategory={current} />;
}
