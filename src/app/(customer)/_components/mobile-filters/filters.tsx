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
import { useEffect, useState } from "react";
import { type getCategories } from "@/server/queries/categories";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Categories from "../categories";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

function Filters({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className={buttonVariants()}>Filters</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="max-h-80 min-h-40 overflow-y-auto px-4">
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
