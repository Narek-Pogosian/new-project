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
import { Filter } from "lucide-react";
import Filters from "../filters";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
  currentCategory: string | undefined;
}

function MobileFiltersImplementation({ categories, currentCategory }: Props) {
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants()}>
        <Filter /> Filters
      </SheetTrigger>
      <SheetContent side="left" className="max-w-xs">
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
