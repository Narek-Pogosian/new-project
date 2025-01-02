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
      <section className="flex w-full flex-col gap-8 sm:flex-row xl:gap-16">
        <div className="relative aspect-[9/11] w-full shrink-0 sm:w-60 md:w-72 lg:w-96 xl:w-[450px]">
          <Image
            src={product.poster}
            alt=""
            fill
            sizes="33vw"
            className="rounded"
          />
          <div className="absolute inset-0 rounded bg-black/60 p-8 text-white sm:hidden">
            <h1 className="mb-1 text-xl font-bold">{product.name}</h1>
            <p className="mb-4 text-foreground-muted">€{product.price}</p>
            <p className="max-w-lg">{product.description}</p>
          </div>
        </div>
        <div>
          <h1 className="mb-1 text-2xl font-bold max-sm:hidden">
            {product.name}
          </h1>
          <p className="mb-4 text-foreground-muted max-sm:hidden">
            €{product.price}
          </p>

          <div className="mb-2">
            {product.productAttributes.map((attributes) => (
              <ul key={attributes.id} className="flex gap-4">
                {attributes.values.map((v) => (
                  <div key={v}>{v}</div>
                ))}
              </ul>
            ))}
          </div>

          <div>
            <Button variant="accent" className="mb-4 mr-4">
              Add to cart
            </Button>
            <span>Quantity picker</span>
          </div>

          <hr className="pb-4 max-sm:hidden" />
          <p className="max-w-lg text-foreground-muted max-sm:hidden">
            {product.description}
          </p>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
