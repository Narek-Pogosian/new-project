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
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

function DeleteAccount() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () =>
      fetch("/api/account", {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) throw Error("");
        return res.json();
      }),

    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async () => {
      await signOut();
      setIsOpen(false);
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            All your data will be lost and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            loading={isLoading}
            variant="destructive"
            onClick={() => mutate()}
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAccount;
