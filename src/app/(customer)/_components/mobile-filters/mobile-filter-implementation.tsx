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
}

function MobileFiltersImplementation({ categories }: Props) {
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
        <Filters categories={categories} />
      </SheetContent>
    </Sheet>
  );
}

export default MobileFiltersImplementation;
