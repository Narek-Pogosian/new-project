import { getServerAuthSession } from "@/server/auth";
import { createOrderSchema } from "@/schemas/checkout-schemas";
import { type NextRequest } from "next/server";
import { type JsonObject } from "next-auth/adapters";
import { cookies } from "next/headers";
import { db } from "@/server/db";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    const { data } = createOrderSchema.safeParse(await req.json());
    if (!data || data.length === 0) {
      return new Response(JSON.stringify({}), { status: 400 });
    }

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

    return new Response(JSON.stringify({ msg: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerAuthSession();
    const userId = session?.user.id;

    if (!userId) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }

    const { data, success } = z
      .object({ id: z.number() })
      .safeParse(await req.json());

    if (!success) {
      return new Response(JSON.stringify({ msg: "Please provide an id" }), {
        status: 400,
      });
    }

    const order = await db.order.findFirst({ where: { id: data.id } });
    if (!order || order.userId !== userId) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }

    await db.order.update({
      where: { id: data.id },
      data: {
        status: "CANCELLED",
      },
    });

    return new Response(JSON.stringify({ msg: "Order has been cancelled" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error canceling order:", err);

    return new Response(JSON.stringify({ msg: "Internal server error" }), {
      status: 500,
    });
  }
}
