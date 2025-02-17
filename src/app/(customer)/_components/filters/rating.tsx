"use client";

import StarRating from "@/components/ui/star-rating";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";

function Rating() {
  const [queryState, setQueryState] = useQueryStates({
    page: parseAsInteger,
    min_rating: parseAsInteger.withDefault(0),
  });

  const [ratingValue, setRatingValue] = useState(queryState.min_rating);

  useEffect(() => {
    setRatingValue(queryState.min_rating);
  }, [queryState]);

  function handleRatingChange(rating: number) {
    void setQueryState(
      { page: null, min_rating: rating },
      { shallow: false, clearOnDefault: true, history: "push" },
    );
  }

  return (
    <div>
      <h3 className="mb-2 border-b pb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
        Minimum Rating
      </h3>
      <StarRating value={ratingValue} onValueChange={handleRatingChange} />
    </div>
  );
}

export default Rating;
