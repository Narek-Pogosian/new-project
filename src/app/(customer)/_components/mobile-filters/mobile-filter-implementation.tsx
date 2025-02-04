"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type getCategories } from "@/server/queries/categories";
import Categories from "../filters/categories";
import { Filter } from "lucide-react";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

function MobileFiltersImplementation({ categories }: Props) {
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants()}>
        <Filter /> Filters
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="max-h-80 min-h-40 overflow-y-auto px-4">
          <Categories categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileFiltersImplementation;
