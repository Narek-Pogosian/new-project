"use client";

import { type ProductAttribute } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type Props = {
  productAttributes: ProductAttribute[];
};

function AddToCart({ productAttributes }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, string>
  >({});

  const handleSelect = (attributeId: number, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: value,
    }));
  };

  const isValidSelection =
    productAttributes.every((attribute) => selectedAttributes[attribute.id]) &&
    quantity > 0;

  return (
    <>
      <div className="mb-6 space-y-4">
        {productAttributes.map((attribute) => (
          <div key={attribute.id}>
            <h3 className="mb-1 text-xs uppercase tracking-wider text-foreground-muted">
              {attribute.name}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {attribute.values.map((value) => (
                <li
                  key={value}
                  className={cn(
                    "cursor-pointer rounded border px-3 py-1.5 text-xs font-medium md:text-sm",
                    {
                      "bg-primary text-primary-foreground":
                        selectedAttributes[attribute.id] === value,
                    },
                  )}
                  onClick={() => handleSelect(attribute.id, value)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex">
        <Button variant="accent" className="mr-4" disabled={!isValidSelection}>
          Add to cart
        </Button>
        <Input
          type="number"
          min={1}
          max={100}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-24 bg-background"
        />
      </div>
    </>
  );
}

export default AddToCart;
