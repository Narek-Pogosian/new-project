import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

function createUrl(searchParams: ProductQueryParamsType, page: number) {
  const newSearchParams = { ...searchParams, page: page.toString() };

  Object.entries(newSearchParams).forEach(([key, value]) => {
    if (!value) {
      delete newSearchParams[key as keyof ProductQueryParamsType];
    }
  });

  const stringifiedParams: Record<string, string> = {};
  Object.entries(newSearchParams).forEach(([key, value]) => {
    if (value !== undefined) {
      stringifiedParams[key] = String(value);
    }
  });

  const queryString = new URLSearchParams(stringifiedParams).toString();
  return `/shop?${queryString}`;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  totalPages: number;
  currentPage: number;
  searchParams: ProductQueryParamsType;
}) {
  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createUrl(searchParams, currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={cn({
              "pointer-events-none opacity-40": currentPage <= 1,
            })}
          />
        </PaginationItem>
        {new Array(totalPages).fill(0).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={createUrl(searchParams, i + 1)}
              isActive={i + 1 === currentPage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={createUrl(searchParams, currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={cn({
              "pointer-events-none opacity-40": currentPage >= totalPages,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
