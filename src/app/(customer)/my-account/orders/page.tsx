import { getOrders } from "@/server/queries/order";
import { FileQuestion } from "lucide-react";
import OrderList from "./_components/order-list";

async function MyOrdersPage() {
  const orders = await getOrders();

  if (!orders) throw Error("");

  if (orders?.length === 0) {
    return (
      <div className="pt-20 text-center">
        <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
          <FileQuestion className="size-10 text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Oops! No order found</h2>
        <p className="text-sm text-foreground-muted">
          Looks like you haven&apos;t placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <OrderList orders={orders} />
    </>
  );
}

export default MyOrdersPage;
