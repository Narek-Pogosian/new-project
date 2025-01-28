import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type DeleteCartType } from "@/schemas/cart-schemas";
import { type GetCartType } from "@/app/api/cart/route";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  item: Awaited<GetCartType>["items"][number];
  cartId: number;
}

export default function CartItem({ item }: Props) {
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

        <QuantityChange itemId={item.id} initialQuantity={item.quantity} />
      </div>

      <DeleteButton itemId={item.id} />
    </div>
  );
}

function DeleteButton({ itemId }: { itemId: number }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: DeleteCartType) =>
      fetch("/api/cart", { method: "DELETE", body: JSON.stringify(data) }).then(
        (res) => res.json(),
      ),
    onMutate: ({ cartItemId }) => {
      const previousCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (old: Awaited<GetCartType>) => ({
        ...old,
        items: old.items.filter((i) => i.id !== cartItemId),
      }));

      return { previousCart };
    },
    onError: (err, _, ctx) => {
      queryClient.setQueryData(["cart"], ctx?.previousCart);
    },
    // onSuccess: () => {
    //   void queryClient.invalidateQueries({ queryKey: ["cart"] });
    // },
  });

  return (
    <Button
      size="icon"
      variant="ghost"
      className="size-7"
      onClick={() => mutate({ cartItemId: itemId })}
    >
      <span className="sr-only">Remove from cart</span>
      <X />
    </Button>
  );
}

function QuantityChange({
  itemId,
  initialQuantity,
}: {
  itemId: number;
  initialQuantity: number;
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  return (
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
  );
}
