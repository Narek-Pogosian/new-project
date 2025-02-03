"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="pt-24 text-center">
      <div className="mx-auto mb-4 flex size-28 items-center justify-center rounded-full bg-primary/5">
        <X className="size-14 text-primary" />
      </div>
      <h2 className="mb-4 text-xl font-semibold">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
