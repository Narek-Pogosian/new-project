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

export function MobileFiltersButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <Button {...props}>
      <Filter />
      Filters
    </Button>
  );
}

export default function MobileFilters({ categories, currentCategory }: Props) {
  const isMounted = useIsMounted();
  const isMobile = useIsMobile();

  if (!isMounted) {
    return <MobileFiltersButton />;
  }

  return (
    <>
      {isMobile && (
        <Suspense fallback={<MobileFiltersButton />}>
          <MobileFiltersImplementation
            categories={categories}
            currentCategory={currentCategory}
          />
        </Suspense>
      )}
    </>
  );
}
