import ScrollTop from "@/components/scroll-top";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

function ProductLoading() {
  return (
    <>
      <ScrollTop />
      <section className="flex flex-col gap-8 sm:flex-row xl:gap-16">
        <div className="relative aspect-[9/11] h-fit w-full shrink-0 sm:w-72 lg:w-96 xl:w-[500px]">
          <Skeleton className="h-full w-full" />
          <div className="absolute inset-0 rounded bg-black/60 p-8 text-white sm:hidden">
            <Skeleton className="mb-2 h-7 text-xl font-bold" />
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <Star className="size-4 fill-current text-accent-500" />
                <Skeleton className="size-4" />
              </div>
              <Skeleton className="w-20" />
            </div>
            <Skeleton className="mb-2 h-4 max-w-lg" />
            <Skeleton className="mb-2 h-4 max-w-lg" />
            <Skeleton className="mb-2 h-4 max-w-lg" />
            <Skeleton className="mb-2 h-4 max-w-lg" />
            <Skeleton className="h-4 max-w-lg" />
          </div>
        </div>
        <div className="w-full max-w-lg">
          <Skeleton className="mb-2 h-8 font-bold max-sm:hidden" />
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <Star className="size-4 fill-current text-accent-500" />
              <Skeleton className="size-4" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>

          <hr className="my-6 max-sm:hidden" />
          <div className="mb-4">
            <Skeleton className="mb-1 h-4 w-12" />
            <ul className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-10" />
              <Skeleton className="h-9 w-10" />
              <Skeleton className="h-9 w-10" />
              <Skeleton className="h-9 w-10" />
            </ul>
          </div>
          <div className="mb-5">
            <Skeleton className="mb-1 h-4 w-12" />
            <ul className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </ul>
          </div>

          <div className="flex gap-1">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
          <hr className="my-6 max-sm:hidden" />

          <Skeleton className="mb-2 h-4 max-w-lg max-sm:hidden" />
          <Skeleton className="mb-2 h-4 max-w-lg max-sm:hidden" />
          <Skeleton className="h-4 max-w-lg max-sm:hidden" />
        </div>
      </section>
    </>
  );
}

export default ProductLoading;
