import { getServerAuthSession } from "@/server/auth";
import { createOrderSchema } from "@/schemas/checkout-schemas";
import { type NextRequest } from "next/server";
import { type JsonObject } from "next-auth/adapters";
import { db } from "@/server/db";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await getServerAuthSession();

  const { data } = createOrderSchema.safeParse(await req.json());

  if (!data || data.length === 0) {
    return new Response(JSON.stringify({}), { status: 400 });
  }

  try {
    const order = await db.order.create({
      data: {
        userId: session?.user.id ?? undefined,
        status: "PENDING",
      },
    });

    const orderItems = await db.orderItem.createMany({
      data: data.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        productAttributes: item.attributes as JsonObject,
        quantity: item.quantity,
      })),
    });

    await db.cart.delete({ where: { id: data[0]?.cartId } });

    const cookieStore = await cookies();
    cookieStore.delete("cartToken");

    return new Response(JSON.stringify({ order, orderItems }), { status: 201 });
  } catch (err) {
    console.error("Error creating order:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
