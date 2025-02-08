"use client";

import { useSession } from "next-auth/react";
import { lazy } from "react";

const WriteReviewImplementation = lazy(
  () => import("./write-review-implementation"),
);

function WriteReview({ productSlug }: { productSlug: string }) {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">We value your opinion</h3>
      <p className="mb-4 max-w-md font-medium text-foreground-muted">
        The time is now for it to be okay to be great. People in this world shun
        people for being great.
      </p>
      <WriteReviewImplementation productSlug={productSlug} />
    </div>
  );
}

export default WriteReview;
