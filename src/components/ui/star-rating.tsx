"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface Props {
  maxRating?: number;
  value: number;
  onValueChange: (val: number) => void;
}

function StarRating({ maxRating = 5, value, onValueChange }: Props) {
  const currentRating = useRef(value);
  const [hoverValue, setHoverValue] = useState(0);

  function handleClick(val: number) {
    if (val === currentRating.current) {
      onValueChange(0);
    } else {
      onValueChange(val);
      currentRating.current = val;
    }
  }

  return (
    <div className="flex" tabIndex={0}>
      {Array.from({ length: maxRating }, (_, i) => (
        <label
          key={i}
          htmlFor={`star-${i}`}
          className={cn(
            "cursor-pointer border-primary px-1 text-3xl text-primary/20 has-[:focus-visible]:border",
            {
              "text-accent-500": i < value || i < hoverValue,
            },
          )}
          onMouseEnter={() => setHoverValue(i + 1)}
          onMouseLeave={() => setHoverValue(0)}
        >
          <input
            id={`star-${i}`}
            type="radio"
            name="rating"
            value={i + 1}
            onClick={() => handleClick(i + 1)}
            aria-label={`Rate ${i + 1} star`}
            className="sr-only"
          />
          ★
        </label>
      ))}
    </div>
  );
}

export default StarRating;
