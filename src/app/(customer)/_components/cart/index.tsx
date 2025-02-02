"use client";

import { type GetCartType } from "@/app/api/cart/route";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetCart } from "@/hooks/use-get-cart";
import { ShoppingCart } from "lucide-react";
import { formatPrice, getTotalPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CartItem from "./cart-item";
import Link from "next/link";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const { data, isLoading, isError } = useGetCart();

  console.log("Cart", data);

  useEffect(() => {
    setIsOpen(false);
  }, [params]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="relative" asChild>
        <Button size="icon" variant="ghost">
          <span className="sr-only">Your cart</span>
          <ShoppingCart />
          {data && data.items.length > 0 && (
            <CartBadge count={data.items.length} />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="pr-2">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <CartLoading />
        ) : isError ? (
          <CartError />
        ) : (
          data && <CartContent data={data} />
        )}
      </SheetContent>
    </Sheet>
  );
}

export const CartContent = ({ data }: { data: GetCartType }) => {
  if (!data.items.length) {
    return <p className="pt-10 text-center">Your cart is empty.</p>;
  }

  return (
    <div className="h-full">
      <ul className="h-[calc(100%-120px)] overflow-y-scroll pr-1 scrollbar-thin">
        {data.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="h-[120px] py-4 text-center">
        <p className="mb-2 font-medium">
          Total Price: {formatPrice(getTotalPrice(data.items))}
        </p>
        <Button className="w-full" asChild>
          <Link href="/checkout">Procceed to checkout</Link>
        </Button>
      </div>
    </div>
  );
};

const CartBadge = ({ count }: { count: number }) => (
  <span
    aria-hidden
    className="pointer-events-none absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
  >
    {count}
  </span>
);

const CartError = () => (
  <div className="pt-10 text-center">
    <p className="mb-2 font-semibold">Something went wrong</p>
    <Button onClick={() => location.reload()}>Try Again</Button>
  </div>
);

const CartLoading = () => <p className="pt-10 text-center">Loading...</p>;
