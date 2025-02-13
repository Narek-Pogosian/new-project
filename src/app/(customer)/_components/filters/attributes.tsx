import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type getCategories } from "@/server/queries/categories";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  availableAttributes: Awaited<
    ReturnType<typeof getCategories>
  >[number]["categoryAttributes"];
}

function Attributes({ availableAttributes }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setAttributesFromParams = useCallback(() => {
    const attributesFromParams = searchParams.getAll("attributes");
    const initialAttributes: Record<string, string[]> =
      availableAttributes.reduce(
        (acc, { name }) => {
          acc[name] = [];
          return acc;
        },
        {} as Record<(typeof availableAttributes)[number]["name"], string[]>,
      );

    attributesFromParams.forEach((attr) => {
      const [key, values] = attr.split(":");
      if (key && values) {
        initialAttributes[key] = values.split(",");
      }
    });

    return initialAttributes;
  }, [searchParams, availableAttributes]);

  const [selectedAttributes, setSelectedAttributes] = useState(
    setAttributesFromParams,
  );

  useEffect(() => {
    setSelectedAttributes(setAttributesFromParams);
  }, [searchParams, setAttributesFromParams]);

  function handleSelect(name: string, value: string) {
    setSelectedAttributes((prev) => {
      if (!Array.isArray(prev[name])) return {};

      const isAlreadySelected = prev[name].includes(value);
      return {
        ...prev,
        [name]: isAlreadySelected
          ? prev[name].filter((v) => v !== value)
          : [...prev[name], value],
      };
    });
  }

  function handleApply() {
    const params = new URLSearchParams(window.location.search);
    params.delete("attributes");

    Object.entries(selectedAttributes).forEach(([key, values]) => {
      if (values.length > 0) {
        params.append("attributes", `${key}:${values.join(",")}`);
      }
    });

    const queryString = params.toString();
    const url = `/?${queryString}`;

    router.push(url);
  }

  function handleReset() {
    const params = new URLSearchParams(window.location.search);
    params.delete("attributes");

    const queryString = params.toString();
    const url = `/?${queryString}`;

    setSelectedAttributes({});
    router.push(url);
  }

  return (
    <div>
      <h3 className="mb-2 border-b pb-2 font-bold">Available attributes</h3>

      {availableAttributes.map((attribute) => (
        <div key={attribute.id} className="mb-4">
          <h4
            id={attribute.name}
            className="mb-1 text-xs uppercase tracking-wider text-foreground-muted"
          >
            {attribute.name}
          </h4>
          <ul className="flex flex-wrap gap-1" aria-labelledby={attribute.name}>
            {attribute.possibleValues.map((value) => (
              <li key={value}>
                <Button
                  variant="outline"
                  size="sm"
                  aria-pressed={selectedAttributes[attribute.name]?.includes(
                    value,
                  )}
                  aria-label={`Filter by ${attribute.name}: ${value}`}
                  className={cn("text-xs md:text-sm", {
                    "bg-primary text-primary-foreground":
                      selectedAttributes[attribute.name]?.includes(value),
                  })}
                  onClick={() => handleSelect(attribute.name, value)}
                >
                  {value}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleApply}
          aria-label="Apply selected filters"
        >
          Apply
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleReset}
          aria-label="Reset all filters"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Attributes;
