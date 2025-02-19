import { formatPrice, getTotalPrice } from "@/lib/utils";
import { type getOrders } from "@/server/queries/order";
import Image from "next/image";
import Link from "next/link";

interface Props {
  item: NonNullable<Awaited<ReturnType<typeof getOrders>>>[number];
}

function OrderItem({ item }: Props) {
  return (
    <li className="border-b pb-8 @container">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-full font-semibold capitalize">
            {item.status.toLowerCase()}
          </span>
          <span aria-hidden className="text-lg text-foreground-muted">
            |
          </span>
          <span className="h-full text-sm font-medium text-foreground-muted">
            {item.createdAt.toDateString()}
          </span>
        </div>
        {item.status === "PENDING" && <div>Cancel</div>}
      </div>

      <ul className="mb-4 grid gap-4 @xl:grid-cols-2">
        {item.items.map((item) => {
          const attributes = item.productAttributes as string;
          return (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.product.poster}
                alt=""
                width={60}
                height={95}
                className="rounded"
              />
              <div className="flex grow justify-between">
                <div>
                  <Link href={`/product/${item.product.slug}`}>
                    <h3 className="text-sm font-semibold underline-offset-2 hover:underline">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="mb-2 text-sm text-foreground-muted">
                    {/* eslint-disable-next-line */}
                    {Object.entries(JSON.parse(attributes)).map(
                      ([key, value]) => (
                        <span
                          key={key}
                          className="mr-2 text-sm text-foreground-muted"
                        >
                          <span>{key}:</span> {value as string}
                        </span>
                      ),
                    )}
                  </p>
                  <p className="text-sm text-foreground-muted">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </ul>

      <p className="text-sm text-foreground-muted">
        Total price: <b>{formatPrice(getTotalPrice(item.items))}</b>
      </p>
    </li>
  );
}

export default OrderItem;
