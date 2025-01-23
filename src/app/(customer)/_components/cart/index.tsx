"use client";

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

function Cart() {
  const { data, isLoading, isError, isSuccess } = useGetCart();

  return (
    <Sheet>
      <SheetTrigger className="relative" asChild>
        <Button size="icon" variant="ghost">
          <span className="sr-only">Your cart</span>
          <ShoppingCart />
          {data && data.items.length > 0 && (
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
            >
              {data.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error</p>
        ) : (
          isSuccess && JSON.stringify(data!.items)
        )}
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
