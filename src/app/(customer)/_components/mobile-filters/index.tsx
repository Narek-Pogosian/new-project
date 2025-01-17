"use client";

import { type getCategories } from "@/server/queries/categories";
import { lazy, Suspense } from "react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const Filters = lazy(() => import("./filters"));

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

export default function MobileFilters({ categories }: Props) {
  const isMounted = useIsMounted();
  const isMobile = useIsMobile();

  if (!isMounted) {
    return <Button>Filters</Button>;
  }

  return (
    <>
      {isMobile && (
        <Suspense fallback={<Button>Filters</Button>}>
          <Filters categories={categories} />
        </Suspense>
      )}
    </>
  );
}
