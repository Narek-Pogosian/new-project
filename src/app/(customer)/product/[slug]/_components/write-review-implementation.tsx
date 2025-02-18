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
import { reviewSchema, type ReviewSchemaType } from "@/schemas/review-schemas";
import { LoadingButton } from "@/components/ui/loading-button";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StarRating from "@/components/ui/star-rating";

export default function WriteReviewImplementation({
  productId,
}: {
  productId: number;
}) {
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Write a review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <WriteReviewContent productId={productId} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}

function WriteReviewContent({
  productId,
  closeDialog,
}: {
  productId: number;
  closeDialog: () => void;
}) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: (vals: ReviewSchemaType) =>
      fetch("/api/review", { method: "POST", body: JSON.stringify(vals) }).then(
        (res) => {
          if (res.ok) return res.json();
          if (res.status === 409)
            throw Error("You have already created a review for this product");
          throw Error("Something went wrong");
        },
      ),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { data, success } = reviewSchema.safeParse({
      productId,
      rating,
      comment: comment.trim() || undefined,
    });

    if (!success) {
      if (!rating) setError("Please select a rating");
      return;
    }

    try {
      mutate(data, {
        onSuccess: () => {
          router.refresh();
          closeDialog();
        },
        onError: (err) => {
          setError(err.message);
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset>
        <legend className="text-sm font-semibold">Rating</legend>
        <StarRating value={rating} onValueChange={setRating} />
      </fieldset>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="comment">
          Comment
        </label>
        <Textarea
          id="comment"
          rows={4}
          placeholder="Write your review here (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {(error || mutationError) && (
        <p className="text-sm font-semibold text-danger-600 dark:text-danger-500">
          {error ?? mutationError?.message}
        </p>
      )}

      <LoadingButton loading={isPending} type="submit">
        Submit Review
      </LoadingButton>
    </form>
  );
}
