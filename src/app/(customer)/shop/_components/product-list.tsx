import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import { discoverProducts } from "@/server/queries/products";
import ProductPagination from "./product-pagination";
import Image from "next/image";

export default async function ProductList({
  searchParams,
}: {
  searchParams: ProductQueryParamsType;
}) {
  const res = await discoverProducts(searchParams);

  return (
    <section aria-label="products">
      <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
        {res.products.map((product) => (
          <li key={product.id}>
            <div className="relative mb-2 aspect-[8/11]">
              <Image
                src={product.poster}
                alt=""
                fill
                sizes="33vw"
                className="rounded"
              />
            </div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-foreground-muted">€{product.price}</p>
          </li>
        ))}
      </ul>
      <ProductPagination
        currentPage={res.currentPage}
        totalPages={res.totalPages}
        searchParams={searchParams}
      />
    </section>
  );
}
