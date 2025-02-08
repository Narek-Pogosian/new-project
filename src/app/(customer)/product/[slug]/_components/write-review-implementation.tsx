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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      <DialogContent className="max-w-3xl">
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
  const form = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productId,
      comment: "",
      rating: "" as unknown as number,
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (vals: ReviewSchemaType) =>
      fetch("/api/review", { method: "POST", body: JSON.stringify(vals) }).then(
        (res) => res.json(),
      ),
  });

  function onSubmit(data: ReviewSchemaType) {
    try {
      mutate(data, {
        onSuccess: () => {
          router.refresh();
          closeDialog();
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="1 - 5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your review..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <p className="font-semibold text-danger-600 dark:text-danger-500">
            {error.message}
          </p>
        )}

        <LoadingButton loading={isPending} type="submit">
          Submit Review
        </LoadingButton>
      </form>
    </Form>
  );
}
