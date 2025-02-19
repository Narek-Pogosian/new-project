"use client";

import { useMemo, useState } from "react";
import { type OrderStatus } from "@prisma/client";
import { type getOrders } from "@/server/queries/order";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  orders: NonNullable<Awaited<ReturnType<typeof getOrders>>>;
}

function OrderList({ orders }: Props) {
  const [status, setStatus] = useState<OrderStatus | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => (status ? order.status === status : true));
  }, [orders, status]);

  return (
    <>
      <div
        role="group"
        aria-labelledby="filter-status"
        className="mb-6 flex gap-2"
      >
        <span id="filter-status" className="sr-only">
          Filter orders by status
        </span>
        <Button
          onClick={() => setStatus(null)}
          variant={status === null ? "default" : "outline"}
          aria-pressed={status === null}
        >
          All Orders
        </Button>
        {["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"].map(
          (statusOption) => (
            <Button
              key={statusOption}
              onClick={() => setStatus(statusOption as OrderStatus)}
              variant={status === statusOption ? "default" : "outline"}
              className="capitalize"
              aria-pressed={status === statusOption}
            >
              {statusOption.toLowerCase()}
            </Button>
          ),
        )}
      </div>

      <hr className="mb-6" />

      <div aria-live="polite" className="mb-4">
        {filteredOrders.length === 0 ? (
          <div className="mx-auto mb-8 pt-16 text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
              <FileQuestion className="size-10 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Oops! No Results</h2>
            <p className="text-sm text-foreground-muted">
              Try adjusting your filters to find your orders!
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {filteredOrders.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between gap-2 [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:pb-6"
              >
                {JSON.stringify(order, null, 2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default OrderList;
