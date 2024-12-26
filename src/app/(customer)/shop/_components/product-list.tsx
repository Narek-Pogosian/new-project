import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import { discoverProducts } from "@/server/queries/products";
import Image from "next/image";

async function ProductList({ data }: { data: ProductQueryParamsType }) {
  const res = await discoverProducts(data);

  return (
    <section aria-label="products">
      <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-8">
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
    </section>
  );
}

export default ProductList;
