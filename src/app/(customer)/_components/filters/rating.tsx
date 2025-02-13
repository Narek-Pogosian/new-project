"use client";

import StarRating from "@/components/ui/star-rating";
import { parseAsInteger, useQueryStates } from "nuqs";

function Rating() {
  const [queryState, setQueryState] = useQueryStates({
    page: parseAsInteger,
    min_rating: parseAsInteger.withDefault(0),
  });

  function handleRatingChange(rating: number) {
    void setQueryState(
      { page: null, min_rating: rating },
      { shallow: false, clearOnDefault: true },
    );
  }

  return (
    <div>
      <h3 className="mb-2 border-b pb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
        Minimum Rating
      </h3>
      <StarRating
        value={queryState.min_rating}
        onValueChange={handleRatingChange}
      />
    </div>
  );
}

export default Rating;
