import { getServerAuthSession } from "@/server/auth";
import { cookies } from "next/headers";

export type GetCartType = ReturnType<typeof getUserCart>;

async function getUserCart(userId: string) {
  return [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ];
}

export async function GET() {
  const session = await getServerAuthSession();

  if (session) {
    try {
      const cart = await getUserCart(session.user.id);
      return new Response(JSON.stringify({ cart }), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ message: err }), { status: 500 });
    }
  }

  const cookieStore = await cookies();
  const cartToken = cookieStore.get("cartToken");

  if (!cartToken) {
    cookieStore.set("cartToken", crypto.randomUUID(), {
      httpOnly: true,
      path: "/",
    });
  }

  return new Response(JSON.stringify([]), { status: 200 });
}
