"use client";

import { formatPrice, getTotalPrice } from "@/lib/utils";
import { useGetCart } from "@/hooks/use-get-cart";
import { Loader2 } from "lucide-react";
import CartItem from "../../_components/cart/cart-item";

function CheckoutCart() {
  const { data, isError, isLoading } = useGetCart();

  if (isLoading) {
    return (
      <div className="grid h-44 w-full max-w-96 place-content-center rounded border bg-background-input px-4">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="grid h-44 w-full max-w-96 place-content-center rounded border bg-background-input px-4">
        Error
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <div className="grid h-44 w-full max-w-96 place-content-center rounded border bg-background-input px-4">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="h-fit w-full max-w-96 rounded border bg-background-input px-4">
      {data.items.map((item) => (
        <CartItem key={item.id} item={item} allowQuantityChange={false} />
      ))}
      <p className="my-4 text-sm font-medium">
        Total price: {formatPrice(getTotalPrice(data.items))}
      </p>
    </div>
  );
}

export default CheckoutCart;
