import { getServerAuthSession } from "../auth";
import { db } from "../db";

export async function getOrders() {
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  if (!userId) return;

  return db.order.findMany({
    where: { userId: userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              slug: true,
              name: true,
              poster: true,
              price: true,
            },
          },
        },
      },
    },
  });
}
