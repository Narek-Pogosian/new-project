import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/server/queries/products";
import Image from "next/image";

type Params = Promise<{ slug: string }>;

async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) throw Error();

  return (
    <>
      <section className="flex w-full gap-10">
        <div className="relative w-1/3">
          <Image
            src={product.poster}
            alt=""
            fill
            sizes="33vw"
            className="rounded"
          />
        </div>
        <div className="border-l-2 border-accent-500/30 pl-10">
          <h1 className="mb-1 text-2xl font-bold">{product.name}</h1>
          <p className="mb-4 text-foreground-muted">€{product.price}</p>
          <Button variant="accent" className="mb-4">
            Add to cart
          </Button>
          <p className="max-w-lg text-foreground-muted">
            {product.description}
          </p>
          <p>{JSON.stringify(product.productAttributes, null, 2)}</p>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
