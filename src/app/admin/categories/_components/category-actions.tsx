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
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteCategoryAction } from "@/server/actions/categories";
import { revalidateDbCache } from "@/server/queries/cache";
import { Pencil, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/loading-button";

export default function CategoryActions({
  categoryId,
}: {
  categoryId: number;
}) {
  return (
    <div className="flex">
      <Link
        href={`/admin/categories/${categoryId}/edit`}
        className={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <span className="sr-only">Edit Category</span>
        <Pencil className="!size-4" />
      </Link>
      <CategoryDeleteAction id={categoryId} />
    </div>
  );
}

function CategoryDeleteAction({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const { executeAsync, isPending } = useAction(deleteCategoryAction, {
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
        <span className="sr-only">Delete Category</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
