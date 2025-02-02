"use client";

import { formatPrice, getTotalPrice } from "@/lib/utils";
import { useGetCart } from "@/hooks/use-get-cart";
import { Loader2 } from "lucide-react";
import { PreviewCartItem } from "../../_components/cart/cart-item";

function CheckoutCart() {
  const { data, isError, isLoading } = useGetCart();

  if (isLoading) {
    return (
      <div className="grid h-44 w-full place-content-center rounded border bg-background-input px-4 lg:max-w-96">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="grid h-44 w-full place-content-center rounded border bg-background-input px-4 lg:max-w-96">
        Error
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <div className="grid h-44 w-full place-content-center rounded border bg-background-input px-4 lg:max-w-96">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="h-fit w-full rounded border bg-background-input px-4 @container lg:max-w-96">
      <div className="grid @xl:grid-cols-2 @xl:gap-x-4">
        {data.items.map((item) => (
          <PreviewCartItem key={item.id} item={item} />
        ))}
      </div>
      <p className="my-4 text-sm font-medium">
        Total price: {formatPrice(getTotalPrice(data.items))}
      </p>
    </div>
  );
}

export default CheckoutCart;
