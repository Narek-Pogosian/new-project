import { type GetCartType } from "@/app/api/cart/route";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  item: Awaited<GetCartType>["items"][number];
  cartId: number;
}

function CartItem({ item }: Props) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  return (
    <div className="group flex justify-between border-b py-5">
      <div className="">
        <h3 className="text-sm font-semibold">{item.product.name}</h3>

        <p className="mb-2 text-sm text-foreground-muted">
          {/* eslint-disable-next-line */}
          {Object.entries(JSON.parse(item.productAttributes as string)).map(
            ([key, value]) => (
              <span key={key} className="mr-2 text-sm text-foreground-muted">
                <span>{key}:</span> {value as string}
              </span>
            ),
          )}
        </p>

        <label>
          <span className="mr-1 text-sm text-foreground-muted">Quantity:</span>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 rounded border py-0.5 pl-2 text-sm"
          />
        </label>
      </div>

      <Button size="icon" variant="ghost" className="size-7">
        <span className="sr-only">Remove from cart</span>
        <X />
      </Button>
    </div>
  );
}

export default CartItem;
