"use client";

import { useAddToCartMutation } from "@/hooks/use-add-to-cart";
import { useState } from "react";
import { useGetCart } from "@/hooks/use-get-cart";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  parseAsString,
  useQueryStates,
  type UseQueryStatesKeysMap,
} from "nuqs";
import { type getProductBySlug } from "@/server/queries/products";

type Props = {
  productAttributes: NonNullable<
    Awaited<ReturnType<typeof getProductBySlug>>
  >["productAttributes"];
  productId: number;
};

function AddToCart({ productAttributes, productId }: Props) {
  const { data: cart } = useGetCart();
  const { mutate, isPending } = useAddToCartMutation();
  const [quantity, setQuantity] = useState(1);

  const [selectedAttributes, setSelectedAttributes] = useQueryStates(
    productAttributes.reduce((acc, { name }) => {
      acc[name] = parseAsString;
      return acc;
      // eslint-disable-next-line
    }, {} as UseQueryStatesKeysMap<any>),
  );

  const isValid =
    productAttributes.every(
      (attribute) => selectedAttributes[attribute.name],
    ) &&
    quantity > 0 &&
    quantity <= 100 &&
    !!cart?.cartId;

  function handleAdd() {
    if (!cart?.cartId || !isValid) return;

    const alreadyInCart = cart?.items.find(
      (v) =>
        v.productAttributes === JSON.stringify(selectedAttributes) &&
        v.productId === productId,
    );

    if (alreadyInCart) return;

    mutate(
      {
        productId,
        quantity,
        cartId: cart.cartId,
        attributes: Object.fromEntries(
          Object.entries(selectedAttributes).map(([key, value]) => [
            key,
            value,
          ]),
        ),
      },
      {
        onSuccess: () => {
          setQuantity(1);
          void setSelectedAttributes((prev) => {
            const resetAttributes = Object.keys(prev).reduce(
              (acc, key) => {
                acc[key] = null;
                return acc;
              },
              // eslint-disable-next-line
              {} as Record<string, any>,
            );
            return resetAttributes;
          });
        },
      },
    );
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    setQuantity(value > 100 ? 100 : value < 1 ? 1 : value);
  }

  return (
    <div>
      <div className="mb-6 space-y-4">
        {productAttributes.map((attribute) => (
          <div key={attribute.id}>
            <h3 className="mb-1 text-xs uppercase tracking-wider text-foreground-muted">
              {attribute.name}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {attribute.values.map((value) => (
                <li key={value}>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn("text-xs md:text-sm", {
                      "bg-primary text-primary-foreground":
                        selectedAttributes[attribute.name] === value,
                    })}
                    onClick={() =>
                      void setSelectedAttributes((prev) => ({
                        ...prev,
                        [attribute.name]: value,
                      }))
                    }
                  >
                    {value}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleAdd}
          disabled={!isValid || isPending}
          className="w-28"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Add to cart"}
        </Button>
        <Input
          type="number"
          min={1}
          max={100}
          value={quantity || ""}
          onChange={handleQuantityChange}
          className="w-24 bg-background"
        />
      </div>
    </div>
  );
}

export default AddToCart;
