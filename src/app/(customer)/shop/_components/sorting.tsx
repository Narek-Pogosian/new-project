"use client";

import { type ProductQueryParamsType } from "@/schemas/product-schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { getUpdatedSearchParams } from "@/lib/utils";

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

function Sorting() {
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
    <Select onValueChange={handleChange}>
      <SelectTrigger className="mb-8 w-60">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortingOptions.map((o) => (
          <SelectItem value={o.label} key={o.label}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default Sorting;
