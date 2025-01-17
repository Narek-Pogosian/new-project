"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { type getCategories } from "@/server/queries/categories";
import { cn } from "@/lib/utils";
import Categories from "../categories";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

function Filters({ categories }: Props) {
  return (
    <Drawer>
      <DrawerTrigger className={buttonVariants()}>Filters</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="max-h-80 overflow-y-auto px-4">
          <Categories categories={categories} />
        </div>
        <DrawerFooter>
          <DrawerClose className={cn("mt-4", buttonVariants())}>
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Filters;
