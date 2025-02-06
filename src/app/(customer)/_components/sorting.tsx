"use client";

import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { Label } from "@/components/ui/label";

type Option = {
  label: string;
  sort_by: ProductQueryParamsType["sort_by"] | null;
  dir: ProductQueryParamsType["dir"] | null;
};

const sortingOptions: Option[] = [
  {
    sort_by: null,
    dir: null,
    label: "Latest",
  },
  {
    sort_by: "rating",
    dir: "asc",
    label: "Most popular",
  },
  {
    sort_by: "price",
    dir: "asc",
    label: "Lowest price",
  },
  {
    sort_by: "price",
    dir: "desc",
    label: "Highest price",
  },
];

function Sorting() {
  const [queryState, setQueryState] = useQueryStates({
    sort_by: parseAsString,
    dir: parseAsString,
    page: parseAsInteger,
  });

  function handleChange(val: string) {
    const option = sortingOptions.find((o) => o.label === val)!;

    void setQueryState(
      {
        sort_by: option.sort_by,
        dir: option.dir,
        page: null,
      },
      { shallow: false, history: "push" },
    );
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
        value={
          sortingOptions.find(
            (o) => o.sort_by === queryState.sort_by && o.dir === queryState.dir,
          )?.label ?? ""
        }
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-48 shadow dark:shadow-black" id="sort-by">
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
