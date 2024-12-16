import { buttonVariants } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProductAction } from "@/server/actions/products";

export default function ProductActions({ productId }: { productId: number }) {
  return (
    <div className="flex">
      <ProductDeleteDialog id={productId} />
    </div>
  );
}

function ProductDeleteDialog({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const { executeAsync, isPending } = useAction(deleteProductAction, {
    onSettled: () => {
      setIsOpen(false);
    },
  });

  async function handleDelete() {
    if (isPending) return;
    await executeAsync(id);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <Trash2 className="!size-4" />
        <span className="sr-only">Delete Product</span>
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            loading={isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
