import CheckoutCard from "./_components/checkout-card";

function CheckoutPage() {
  return (
    <div className="-mt-2 flex justify-center">
      <div className="w-full rounded border bg-background-card p-6 shadow-lg @container dark:shadow-black lg:max-w-[500px]">
        <CheckoutCard />
      </div>
    </div>
  );
}

export default CheckoutPage;
