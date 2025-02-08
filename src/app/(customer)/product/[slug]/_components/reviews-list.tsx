import { type getProductBySlug } from "@/server/queries/products";

interface Props {
  reviews: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>["reviews"];
}

function ReviewsList({ reviews }: Props) {
  return (
    <div>
      Scrollable list of the actual reviews, {JSON.stringify(reviews, null, 2)}
    </div>
  );
}

export default ReviewsList;
