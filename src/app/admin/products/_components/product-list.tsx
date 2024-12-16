"use client";

import { type getProducts } from "@/server/queries/products";
import { FileQuestion, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import ProductActions from "./product-actions";

interface Props {
  products: Awaited<ReturnType<typeof getProducts>>;
}

function ProductList({ products }: Props) {
  const [nameQuery, setNameQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(nameQuery.trim().toLowerCase());
      return matchesName;
    });
  }, [products, nameQuery]);

  return (
    <>
      <div className="mb-8 flex justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground-placeholder" />
          <Input
            id="title"
            aria-label="Title"
            placeholder="Search products..."
            className="pl-9 text-sm shadow-sm"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/admin/products/create">Create product</Link>
        </Button>
      </div>

      <hr className="mb-6" />

      {filteredProducts.length === 0 ? (
        <div className="mx-auto mb-8 pt-16 text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
            <FileQuestion className="size-10 text-primary" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Oops! No Results</h2>
          <p className="text-sm text-foreground-muted">
            Try adjusting your filters to find categories!
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between gap-2 [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:pb-6"
            >
              <div className="flex items-center gap-6">
                <Image
                  src={product.poster}
                  alt={`Image of ${product.name}`}
                  width={80}
                  height={102}
                  className="rounded"
                />
                <div>
                  <h3 className="mb-1 font-semibold">{product.name}</h3>
                  <p className="mb-2 text-xs text-foreground-muted">
                    Created: {new Date(product.createdAt).toDateString()}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    ${product.price}
                  </p>
                </div>
              </div>
              <ProductActions productId={product.id} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ProductList;
