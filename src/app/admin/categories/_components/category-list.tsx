"use client";

import { FileQuestion, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { type Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function CategoryList({ categories }: { categories: Category[] }) {
  const [nameQuery, setNameQuery] = useState("");

  const filteredSurvey = useMemo(() => {
    return categories.filter((category) => {
      const matchesName = category.name
        .toLowerCase()
        .includes(nameQuery.trim().toLowerCase());
      // const matchesStatus = status ? category.status === status : true;
      // return matchesName && matchesStatus;
      return matchesName;
    });
  }, [categories, nameQuery]);

  return (
    <>
      <div className="mb-8 flex justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground-placeholder" />
          <Input
            id="title"
            aria-label="Title"
            placeholder="Search categories..."
            className="pl-9 text-sm shadow-sm"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/admin/categories/create">Create category</Link>
        </Button>
      </div>

      <hr className="mb-6" />

      {filteredSurvey.length === 0 ? (
        <div className="mx-auto mb-8 pt-10 text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
            <FileQuestion className="size-10 text-primary" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Oops! No Results</h2>
          <p className="text-sm text-foreground-muted">
            Try adjusting your filters to find more surveys!
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {filteredSurvey.map((survey) => (
            <p key={survey.id}>{survey.name}</p>
            // <SurveyCard key={survey.id} survey={survey} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CategoryList;
