import { getServerAuthSession } from "@/server/auth";
import { cookies } from "next/headers";
import { db } from "@/server/db";
import { type NextRequest } from "next/server";
import {
  addCartSchema,
  deleteCartSchema,
  updateQuantitySchema,
} from "@/schemas/cart-schemas";

export type GetCartType = Awaited<ReturnType<typeof getCart>>;

async function getCart(userId: string | null, cartToken: string | null) {
  let cart = null;

  if (userId) {
    cart = await db.cart.findFirst({
      where: { userId },
      include: {
        items: { include: { product: true }, orderBy: { productId: "asc" } },
      },
    });
  }

  if (!cart && !userId && cartToken) {
    cart = await db.cart.findFirst({
      where: { cartToken },
      include: {
        items: { include: { product: true }, orderBy: { productId: "asc" } },
      },
    });
  }

  if (!cart) {
    const res = await db.cart.create({
      data: {
        userId: userId ?? undefined,
        cartToken: userId ? undefined : (cartToken ?? undefined),
      },
    });

    return { cartId: res.id, items: [] };
  }

  return { cartId: cart.id, items: cart.items };
}

export async function GET() {
  try {
    const session = await getServerAuthSession();
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken");

    let tokenToUse = cartToken?.value ?? null;
    if (!tokenToUse && !session?.user.id) {
      tokenToUse = crypto.randomUUID();
      cookieStore.set("cartToken", tokenToUse, {
        httpOnly: true,
        path: "/",
      });
    }

    const cart = await getCart(session?.user.id ?? null, tokenToUse);

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
      include: { product: true },
    });

    return new Response(JSON.stringify(cartItem), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  const { data } = deleteCartSchema.safeParse(await req.json());
  if (!data) {
    return new Response(JSON.stringify({}), { status: 401 });
  }

  try {
    await db.cartItem.delete({
      where: {
        id: data.cartItemId,
      },
    });

    return new Response(JSON.stringify({}), { status: 204 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  }
}

export async function PATCH(req: NextRequest) {
  const { data } = updateQuantitySchema.safeParse(await req.json());
  if (!data) {
    return new Response(JSON.stringify({}), { status: 401 });
  }

  try {
    await db.cartItem.update({
      where: {
        id: data.cartItemId,
      },
      data: {
        quantity: data.quantity,
      },
    });

    return new Response(JSON.stringify({}), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  }
}
