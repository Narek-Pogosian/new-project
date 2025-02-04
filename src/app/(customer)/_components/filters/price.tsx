import { parseAsInteger, useQueryStates } from "nuqs";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";

function PriceSlider() {
  const [prices, setPrices] = useQueryStates({
    min_price: parseAsInteger.withDefault(0),
    max_price: parseAsInteger.withDefault(200),
  });

  return (
    <div className="price-slider">
      <h3 className="mb-2 border-b pb-2 font-bold">Price Range</h3>

      <div className="mb-1 flex justify-between text-sm font-medium">
        <span>{formatPrice(prices.min_price, { showZeroAsNumber: true })}</span>
        <span>{formatPrice(prices.max_price)}</span>
      </div>

      <Slider
        aria-label="Price range"
        min={0}
        max={200}
        step={10}
        value={[prices.min_price, prices.max_price]}
        onValueChange={([newMin, newMax]) => {
          void setPrices({ min_price: newMin, max_price: newMax });
        }}
        onValueCommit={([newMin, newMax]) => {
          void setPrices(
            { min_price: newMin, max_price: newMax },
            { shallow: false, history: "push" },
          );
        }}
      />
    </div>
  );
}

export default PriceSlider;
