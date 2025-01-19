import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/Form/CheckoutForm";
// import CheckoutForm from "../Form/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Membership = () => {
  return (
    <div className="">
      {/* Checkout form */}
      <Elements stripe={stripePromise}>
        {/* Form components... */}
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Membership;
