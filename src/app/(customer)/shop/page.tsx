import {
  productQueryParams,
  type ProductQueryParamsType,
} from "@/schemas/product-schemas";
import { getCategories } from "@/server/queries/categories";
import { discoverProducts } from "@/server/queries/products";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
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
    <div className="flex gap-12">
      <Suspense fallback={<p>Loading categories...</p>}>
        <CategoriesWrapper current={data.category} />
      </Suspense>
      <div className="w-full">
        <Sorting />
        <Suspense
          fallback={<p>Loading products...</p>}
          key={Object.values(data).join("")}
        >
          <Products data={data} />
        </Suspense>
      </div>
    </div>
  );
}

async function Products({ data }: { data: ProductQueryParamsType }) {
  const res = await discoverProducts(data);

  return (
    <section aria-label="products">
      <ul className="grid w-full grid-cols-4 gap-10">
        {res.products.map((product) => (
          <li key={product.id}>
            <div className="relative mb-2 aspect-[8/11]">
              <Image src={product.poster} alt="" fill className="rounded" />
            </div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-foreground-muted">€{product.price}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function CategoriesWrapper({ current }: { current: number | undefined }) {
  const res = await getCategories();

  return (
    <nav className="shrink-0" aria-label="categories">
      <Categories categories={res} currentCategory={current} />
    </nav>
  );
}
