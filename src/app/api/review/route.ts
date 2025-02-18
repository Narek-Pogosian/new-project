import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getServerAuthSession } from "@/server/auth";
import { revalidateDbCache } from "@/server/queries/cache";
import { type NextRequest } from "next/server";
import { reviewSchema } from "@/schemas/review-schemas";
import { db } from "@/server/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return new Response(JSON.stringify({}), { status: 401 });
    }

    const { data } = reviewSchema.safeParse(await req.json());
    if (!data) {
      return new Response(JSON.stringify({}), { status: 400 });
    }

    const result = await db.$transaction(async (prisma) => {
      const [review, reviews] = await Promise.all([
        db.review.create({
          data: {
            productId: data.productId,
            comment: data.comment,
            rating: data.rating,
            userId: session.user.id,
          },
        }),
        db.review.findMany({
          where: {
            productId: data.productId,
          },
          select: {
            rating: true,
          },
        }),
      ]);

      const combined = [...reviews, review];
      const averageRating =
        combined.length > 0
          ? combined.reduce((acc, review) => acc + review.rating, 0) /
            combined.length
          : 0;

      const product = await prisma.product.update({
        where: {
          id: data.productId,
        },
        data: {
          rating: averageRating,
        },
        select: {
          slug: true,
        },
      });

      return { product };
    });

    revalidateDbCache(`products-${result.product.slug}`);
    revalidateDbCache("products");

    return new Response(JSON.stringify({ review: result }), { status: 201 });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return new Response(
        JSON.stringify({ message: "Unique constraint violation" }),
        {
          status: 409,
        },
      );
    }

    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
