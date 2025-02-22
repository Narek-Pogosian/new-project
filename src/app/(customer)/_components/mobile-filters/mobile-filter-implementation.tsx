"use client";

import { MobileFiltersButton } from ".";
import { type getCategories } from "@/server/queries/categories";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Filters from "../filters";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
  currentCategory: string | undefined;
}

function MobileFiltersImplementation({ categories, currentCategory }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MobileFiltersButton />
      </SheetTrigger>
      <SheetContent side="left" className="max-w-xs overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Filters</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Filters categories={categories} currentCategory={currentCategory} />
      </SheetContent>
    </Sheet>
  );
}

export default MobileFiltersImplementation;
