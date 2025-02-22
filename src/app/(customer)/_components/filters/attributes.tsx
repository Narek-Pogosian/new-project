import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useCallback, useEffect, useState } from "react";
import { cn, parseAttributesFromParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { type CategoryAttribute } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface Props {
  availableAttributes: CategoryAttribute[];
}

function updateUrl(params: URLSearchParams, router: AppRouterInstance) {
  const queryString = params.toString();
  const url = `/?${queryString}`;
  router.push(url);
}

function Attributes({ availableAttributes }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setAttributesFromParams = useCallback(() => {
    const attributesFromParams = searchParams.getAll("attributes");
    const initialAttributes = parseAttributesFromParams(
      attributesFromParams,
      availableAttributes,
    );

    return initialAttributes;
  }, [searchParams, availableAttributes]);

  const [selectedAttributes, setSelectedAttributes] = useState(
    setAttributesFromParams,
  );

  useEffect(() => {
    setSelectedAttributes(setAttributesFromParams);
  }, [searchParams, setAttributesFromParams]);

  function handleSelect(name: string, value: string) {
    setSelectedAttributes((prev) => ({
      ...prev,
      [name]: prev[name]?.includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...(prev[name] || []), value],
    }));
  }

  function handleApply() {
    const params = new URLSearchParams(window.location.search);
    params.delete("attributes");

    Object.entries(selectedAttributes).forEach(([key, values]) => {
      if (values.length > 0) {
        params.append("attributes", `${key}:${values.join(",")}`);
      }
    });

    updateUrl(params, router);
  }

  function handleReset() {
    const params = new URLSearchParams(window.location.search);
    params.delete("attributes");

    setSelectedAttributes({});
    updateUrl(params, router);
  }

  return (
    <div>
      <h3 className="mb-2 border-b pb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
        Available attributes
      </h3>

      {availableAttributes.map((attribute) => (
        <div key={attribute.id} className="mb-4">
          <h4
            id={attribute.name}
            className="mb-1 text-xs uppercase tracking-wider text-foreground-muted"
          >
            {attribute.name}
          </h4>
          <div
            role="group"
            className="flex flex-wrap gap-1"
            aria-labelledby={attribute.name}
          >
            {attribute.possibleValues.map((value) => (
              <Button
                key={value}
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
            ))}
          </div>
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
