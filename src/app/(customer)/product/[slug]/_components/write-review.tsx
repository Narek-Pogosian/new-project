"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { lazy, Suspense } from "react";

const WriteReviewImplementation = lazy(
  () => import("./write-review-implementation"),
);

function WriteReview({ productId }: { productId: number }) {
  const session = useSession();

  if (session.status !== "authenticated") return <div></div>;

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">We value your opinion</h3>
      <p className="mb-4 max-w-md font-medium text-foreground-muted">
        The time is now for it to be okay to be great. People in this world shun
        people for being great.
      </p>
      <Suspense fallback={<Button>Write a review</Button>}>
        <WriteReviewImplementation productId={productId} />
      </Suspense>
    </div>
  );
}

export default WriteReview;
