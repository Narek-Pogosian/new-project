import CheckoutCart from "./_components/checkout-cart";
import CheckoutForm from "./_components/checkout-form";

function CheckoutPage() {
  return (
    <div className="flex flex-col md:flex-row-reverse">
      <CheckoutCart />
      <div className="grow">
        <CheckoutForm />
      </div>
    </div>
  );
}

export default CheckoutPage;
