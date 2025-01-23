import { getServerAuthSession } from "@/server/auth";
import { cookies } from "next/headers";
import { db } from "@/server/db";
import { type NextRequest } from "next/server";
import { addCartSchema } from "@/schemas/cart-schemas";

export type GetCartType = ReturnType<typeof getCart>;

async function getCart(userId: string | null, cartToken: string | null) {
  let cart = null;

  if (userId) {
    cart = await db.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  }

  if (!cart && cartToken) {
    cart = await db.cart.findFirst({
      where: { cartToken },
      include: { items: { include: { product: true } } },
    });
  }

  if (!cart) {
    const res = await db.cart.create({
      data: {
        userId: userId ?? undefined,
        cartToken: cartToken ?? undefined,
      },
    });

    return { cartId: res.id, items: [] };
  }

  return { cartId: cart.id, items: cart.items };
}

export async function GET() {
  const session = await getServerAuthSession();
  const cookieStore = await cookies();
  const cartToken = cookieStore.get("cartToken");

  try {
    const cart = await getCart(
      session?.user.id ?? null,
      cartToken?.value ?? null,
    );

    if (!cartToken && !session?.user.id) {
      cookieStore.set("cartToken", crypto.randomUUID(), {
        httpOnly: true,
        path: "/",
      });
    }

    return new Response(JSON.stringify(cart), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const { data } = addCartSchema.safeParse(await req.json());
  if (!data) {
    return new Response(JSON.stringify({}), { status: 401 });
  }

  try {
    const cartItem = await db.cartItem.create({
      data: {
        productAttributes: JSON.stringify(data.attributes),
        cartId: data.cartId,
        productId: data.productId,
        quantity: data.quantity,
      },
    });

    return new Response(JSON.stringify(cartItem), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  }
}
