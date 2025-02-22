"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function SearchBox() {
  const [queries, setQueries] = useQueryStates({
    query: parseAsString,
    page: parseAsInteger,
  });

  const [queryState, setQueryState] = useState(queries.query);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    void setQueries(
      { page: null, query: queryState?.trim() || null },
      { shallow: false, history: "push" },
    );
  }

  return (
    <form className="relative" role="search" onSubmit={handleSubmit}>
      <Input
        id="search"
        type="search"
        placeholder="Search.."
        value={queryState ?? ""}
        onChange={(e) => setQueryState(e.target.value)}
        className="h-10 pr-12 font-medium shadow dark:shadow-black"
      />
      <Button
        size="icon"
        variant="ghost"
        className="group absolute right-1 top-1 size-8"
      >
        <Search className="text-foreground-muted transition-colors group-hover:text-foreground" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}

export default SearchBox;
