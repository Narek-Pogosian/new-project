import { parseAsInteger, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const MIN_PRICE = 0;
const MAX_PRICE = 100;

function PriceSlider() {
  const [prices, setPrices] = useQueryStates({
    min_price: parseAsInteger.withDefault(MIN_PRICE),
    max_price: parseAsInteger.withDefault(MAX_PRICE),
    page: parseAsInteger,
  });

  const [priceState, setPriceState] = useState({
    min_price: prices.min_price,
    max_price: prices.max_price,
  });

  useEffect(() => {
    setPriceState({
      min_price: prices.min_price,
      max_price: prices.max_price,
    });
  }, [prices]);

  return (
    <div className="price-slider">
      <h3 className="mb-2 border-b pb-2 font-bold">Price Range</h3>

      <div className="mb-2 flex justify-between text-sm font-medium">
        <span>
          {formatPrice(priceState.min_price, { showZeroAsNumber: true })}
        </span>
        <span>{formatPrice(priceState.max_price)}</span>
      </div>

      <Slider
        aria-label="Price range"
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={10}
        value={[priceState.min_price, priceState.max_price]}
        onValueChange={([newMin, newMax]) => {
          setPriceState({
            min_price: newMin ?? MIN_PRICE,
            max_price: newMax ?? MAX_PRICE,
          });
        }}
        onValueCommit={() => {
          void setPrices(
            {
              min_price: priceState.min_price,
              max_price: priceState.max_price,
              page: null,
            },
            { shallow: false, history: "push" },
          );
        }}
      />
    </div>
  );
}

export default PriceSlider;
