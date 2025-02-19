"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";
import {
  AlertDialogContent,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function OrderCancelDialog({ id }: { id: number }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) =>
      fetch("/api/order", {
        method: "PATCH",
        body: JSON.stringify({ id }),
      }).then((res) => {
        if (!res.ok) throw Error("");
        return res.json();
      }),

    onSuccess: () => {
      setIsOpen(false);
      router.refresh();
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger className="rounded px-3 py-1.5 text-sm font-semibold text-danger-500 hover:bg-danger-400/10">
        Cancel
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <LoadingButton
            loading={isPending}
            variant="destructive"
            onClick={() => mutate(id)}
          >
            Cancel
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default OrderCancelDialog;
