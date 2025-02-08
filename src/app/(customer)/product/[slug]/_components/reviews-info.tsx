import { type getProductBySlug } from "@/server/queries/products";
import WriteReview from "./write-review";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Props {
  reviews: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>["reviews"];
  rating: number;
  productId: number;
}

function analyzeReviews(reviews: Props["reviews"]) {
  const grouped = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;

  for (const review of reviews) {
    grouped[review.rating]!++;
  }

  return grouped;
}

function ReviewsInfo({ reviews, productId, rating }: Props) {
  return (
    <div className="max-w-xl">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="font-bold">{rating.toFixed(1)}</span>
          <span className="inline-flex gap-1">
            {new Array(Math.floor(rating)).fill(0).map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-accent-500 stroke-accent-500"
              />
            ))}
          </span>
        </div>
        <span className="text-sm font-medium">
          Based on <b>{reviews.length}</b> reviews
        </span>
      </div>

      <ul className="mb-6">
        {Object.entries(analyzeReviews(reviews))
          .sort((a, b) => +b[0] - +a[0])
          .map(([key, value]) => (
            <li key={key} className="flex items-center gap-1">
              <span className="font-bold">{key}</span>
              <Star className="size-4 fill-accent-500 stroke-accent-500" />
              <Progress value={(value / reviews.length) * 100} />
              <span className="flex w-10 justify-end text-sm font-medium text-foreground-muted">
                {((value / reviews.length) * 100 || 0).toFixed()}%
              </span>
            </li>
          ))}
      </ul>

      <WriteReview productId={productId} />
    </div>
  );
}

export default ReviewsInfo;
