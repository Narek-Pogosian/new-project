import { type getProductBySlug } from "@/server/queries/products";
import WriteReview from "./write-review";

interface Props {
  reviews: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>["reviews"];
  productId: number;
}

function ReviewsInfo({ reviews, productId }: Props) {
  return (
    <div>
      <div>Rating 0.0 based X review</div>
      <div className="mb-6">reviews distribution</div>
      <WriteReview productId={productId} />
    </div>
  );
}

export default ReviewsInfo;
