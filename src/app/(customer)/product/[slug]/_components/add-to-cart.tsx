"use client";

import { type ProductAttribute } from "@prisma/client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  parseAsString,
  useQueryStates,
  type UseQueryStatesKeysMap,
} from "nuqs";
import { useGetCart } from "@/hooks/use-get-cart";
import { useAddToCartMutation } from "@/hooks/use-add-to-cart";

type Props = {
  productAttributes: ProductAttribute[];
  productId: number;
};

function AddToCart({ productAttributes, productId }: Props) {
  const [quantity, setQuantity] = useState(1);

  const initialSelectedAttributes = useMemo(() => {
    return productAttributes.reduce((acc, { name }) => {
      acc[name] = parseAsString;
      return acc;
      // eslint-disable-next-line
    }, {} as UseQueryStatesKeysMap<any>);
  }, [productAttributes]);

  const [selectedAttributes, setSelectedAttributes] = useQueryStates(
    initialSelectedAttributes,
  );

  const handleSelect = (attributeName: string, value: string) => {
    void setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const cart = useGetCart();
  const mutate = useAddToCartMutation();

  const { data: safeCart, success } = z
    .object({ cartId: z.number() })
    .safeParse(cart.data);

  const isValid =
    productAttributes.every(
      (attribute) => selectedAttributes[attribute.name],
    ) &&
    quantity > 0 &&
    success;

  function handleAdd() {
    if (!safeCart?.cartId) return;
    // if (
    //   cart.data?.items.find(
    //     (v) =>
    //       v.productAttributes ===
    //       JSON.stringify(selectedAttributes && v.productId === productId),
    //   )
    // )
    //   return;

    // TODO: Need to compare the JsonValue productAttributes with the selectedAttributes

    console.log(cart.data?.items.find((v) => v.productId === productId));

    // mutate({
    //   productId,
    //   quantity,
    //   cartId: safeCart.cartId,
    //   attributes: Object.fromEntries(
    //     Object.entries(selectedAttributes).map(([key, value]) => [key, value]),
    //   ),
    // });
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
                    onClick={() => handleSelect(attribute.name, value)}
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
        <Button variant="accent" onClick={handleAdd} disabled={!isValid}>
          Add to cart
        </Button>
        <Input
          type="number"
          min={1}
          max={100}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          className="w-24 bg-background"
        />
      </div>
    </div>
  );
}

export default AddToCart;
