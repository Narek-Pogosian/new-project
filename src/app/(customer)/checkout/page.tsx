import CheckoutCard from "./_components/checkout-card";

function CheckoutPage() {
  return (
    <div className="flex justify-center lg:pt-12">
      <div className="w-full rounded border bg-background-card p-6 @container lg:max-w-[500px]">
        <CheckoutCard />
      </div>
    </div>
  );
}

export default CheckoutPage;
