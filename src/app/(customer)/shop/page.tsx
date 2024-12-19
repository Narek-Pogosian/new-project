import {
  productQueryParams,
  type ProductQueryParamsType,
} from "@/schemas/product-schemas";
import { getCategories } from "@/server/queries/categories";
import { discoverProducts } from "@/server/queries/products";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
        <Categories current={data.category} />
      </Suspense>
      <Suspense fallback={<p>Loading products...</p>}>
        <Products data={data} />
      </Suspense>
    </div>
  );
}

async function Products({ data }: { data: ProductQueryParamsType }) {
  const res = await discoverProducts(data);

  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-semibold text-foreground-muted">
        Products
      </h3>
      <ul className="grid grid-cols-4 gap-10">
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
    </div>
  );
}

async function Categories({ current }: { current: number | undefined }) {
  const res = await getCategories();

  console.log(current);
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-foreground-muted">
        Categories
      </h3>
      <ul>
        <li>All</li>
        {res.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
