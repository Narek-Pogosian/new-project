import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import { discoverProducts } from "@/server/queries/products";
import ProductPagination from "./product-pagination";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ProductList({
  searchParams,
}: {
  searchParams: ProductQueryParamsType;
}) {
  const res = await discoverProducts(searchParams);

  if (res.products.length === 0) {
    return <div className="text-center">No products</div>;
  }

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
            <h3 className="text-sm font-semibold sm:text-base">
              {product.name}
            </h3>
            <p className="text-xs text-foreground-muted sm:text-sm">
              €{product.price}
            </p>
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

export function ProductsSkeleton() {
  return (
    <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
      {new Array(10).fill(0).map((_, i) => (
        <li key={i} className="pb-1.5">
          <Skeleton className="relative mb-2 aspect-[8/11]" />
          <Skeleton className="mb-1 h-5 sm:mb-1.5" />
          <Skeleton className="h-3 w-20 pb-1 sm:h-4" />
        </li>
      ))}
    </ul>
  );
}
