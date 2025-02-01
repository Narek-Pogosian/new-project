"use client";

import { useGetCart } from "@/hooks/use-get-cart";
import { getTotalPrice } from "@/lib/utils";
import CartItem from "../../_components/cart/cart-item";

function CheckoutCart() {
  const { data } = useGetCart();

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="w-full max-w-96 rounded border bg-background-input px-4">
      {data.items.map((item) => (
        <CartItem key={item.id} item={item} allowQuantityChange={false} />
      ))}
      <p className="my-4 text-sm font-medium">
        Total price: {getTotalPrice(data.items)}
      </p>
    </div>
  );
}

export default CheckoutCart;
