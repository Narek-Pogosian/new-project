"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function WriteReviewImplementation({
  productSlug,
}: {
  productSlug: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write a review</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <WriteReviewContent productSlug={productSlug} />
      </DialogContent>
    </Dialog>
  );
}

function WriteReviewContent({ productSlug }: { productSlug: string }) {
  return <div>Content</div>;
}
