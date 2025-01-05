"use client";

import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUpdatedSearchParams } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

type Option = {
  label: string;
} & Pick<ProductQueryParamsType, "sort_by" | "dir">;

const sortingOptions: Option[] = [
  {
    sort_by: "name",
    dir: "asc",
    label: "Name Ascending",
  },
  {
    sort_by: "name",
    dir: "desc",
    label: "Name Descending",
  },
  {
    sort_by: "price",
    dir: "asc",
    label: "Price Ascending",
  },
  {
    sort_by: "price",
    dir: "desc",
    label: "Price Descending",
  },
];

interface Props {
  initialDir: ProductQueryParamsType["dir"] | undefined;
  initialSortBy: ProductQueryParamsType["sort_by"] | undefined;
}

function Sorting({ initialDir, initialSortBy }: Props) {
  const router = useRouter();

  function handleChange(val: string) {
    const option = sortingOptions.find((o) => o.label === val)!;
    const url = getUpdatedSearchParams({
      sort_by: option.sort_by,
      dir: option.dir,
    });

    router.push(url);
  }

  return (
    <div className="flex items-center gap-4">
      <Label
        htmlFor="sort-by"
        className="uppercase tracking-wider text-foreground-muted max-sm:sr-only"
      >
        Sort by
      </Label>
      <Select
        defaultValue={
          sortingOptions.find(
            (o) => o.sort_by === initialSortBy && o.dir === initialDir,
          )?.label
        }
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-48" id="sort-by">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {sortingOptions.map((o) => (
            <SelectItem value={o.label} key={o.label}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default Sorting;
