"use client";

import { type getCategories } from "@/server/queries/categories";
import { lazy, Suspense } from "react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const MobileFiltersImplementation = lazy(
  () => import("./mobile-filter-implementation"),
);

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
  currentCategory: string | undefined;
}

export default function MobileFilters({ categories, currentCategory }: Props) {
  const isMounted = useIsMounted();
  const isMobile = useIsMobile();

  if (!isMounted) {
    return (
      <Button>
        <Filter />
        Filters
      </Button>
    );
  }

  return (
    <>
      {isMobile && (
        <Suspense fallback={<Button>Filters</Button>}>
          <MobileFiltersImplementation
            categories={categories}
            currentCategory={currentCategory}
          />
        </Suspense>
      )}
    </>
  );
}
