import { type getProductBySlug } from "@/server/queries/products";
import { Squirrel, Star } from "lucide-react";

interface Props {
  reviews: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>["reviews"];
}

function ReviewsList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center text-center max-lg:hidden xl:col-span-2">
        <div className="mx-auto mb-4 flex size-28 items-center justify-center rounded-full bg-primary/5">
          <Squirrel className="size-16 text-primary" />
        </div>
        <p className="mb-4 text-xl font-semibold">No reviews</p>
      </div>
    );
  }

  return (
    <ul className="max-h-96 space-y-4 overflow-y-auto pr-2 scrollbar-thin xl:col-span-2">
      {reviews.map((review) => (
        <li key={review.id} className="rounded border bg-background-card p-4">
          <span className="mb-3 inline-flex gap-1">
            {new Array(Math.floor(review.rating)).fill(0).map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-accent-500 stroke-accent-500"
              />
            ))}
          </span>
          {review.comment && (
            <p className="mb-1 text-sm font-medium text-foreground-muted">
              {review.comment}
            </p>
          )}

          <div className="flex gap-2 text-sm">
            <span className="font-semibold">{review.user.name}</span>
            <span className="text-foreground-muted">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;
