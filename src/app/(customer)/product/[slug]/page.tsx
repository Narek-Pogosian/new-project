import { getProductBySlug } from "@/server/queries/products";
import { Luggage, Star } from "lucide-react";
import AddToCart from "./_components/add-to-cart";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Params = Promise<{ slug: string }>;

async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product)
    return (
      <div className="pt-20 text-center">
        <div className="mx-auto mb-4 flex size-28 items-center justify-center rounded-full bg-primary/5">
          <Luggage className="size-14 text-primary" />
        </div>
        <h1 className="mb-4 text-xl font-semibold">Product not found</h1>
        <Button size="lg" asChild>
          <Link href="/">Back to shop</Link>
        </Button>
      </div>
    );

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
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <Star className="size-4 fill-current text-accent-500" />
                <p>{product.rating == 0 ? 0 : product.rating.toFixed(1)}</p>
              </div>
              <p>€{product.price}</p>
            </div>
            <p className="max-w-lg">{product.description}</p>
          </div>
        </div>

        <div className="w-full max-w-lg">
          <h1 className="mb-1 text-2xl font-bold max-sm:hidden">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 text-foreground-muted max-sm:hidden">
            <div className="flex items-center gap-0.5">
              <Star className="size-4 fill-current text-accent-500" />
              <p>{product.rating == 0 ? 0 : product.rating.toFixed(1)}</p>
            </div>
            <p>€{product.price}</p>
          </div>

          <hr className="my-6 max-sm:hidden" />
          <AddToCart productAttributes={product.productAttributes} />
          <hr className="my-6 max-sm:hidden" />

          <p className="max-w-lg text-foreground-muted max-sm:hidden">
            {product.description}
          </p>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
