"use client";

import { type ProductAttribute } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  parseAsString,
  useQueryStates,
  type UseQueryStatesKeysMap,
} from "nuqs";

type Props = {
  productAttributes: ProductAttribute[];
};

function AddToCart({ productAttributes }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useQueryStates(
    productAttributes.reduce((acc, curr) => {
      acc[curr.name] = parseAsString;
      return acc;
      // eslint-disable-next-line
    }, {} as UseQueryStatesKeysMap<any>),
  );

  const handleSelect = (attributeName: string, value: string) => {
    void setSelectedAttributes({
      ...selectedAttributes,
      [attributeName]: value,
    });
  };

  const isValidSelection =
    productAttributes.every(
      (attribute) => selectedAttributes[attribute.name],
    ) && quantity > 0;

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
