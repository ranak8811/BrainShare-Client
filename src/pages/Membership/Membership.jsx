import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/Form/CheckoutForm";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../../public/PageTitle/title";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Membership = () => {
  useTitle("Membership");
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#f3faf0] text-[#040903] flex flex-col items-center px-4 py-8">
      {/* Greeting Section */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome, {user.displayName}!
        </h1>
        <p className="text-lg text-text">
          You’re currently on a Bronze Badge. Upgrade to a Gold Badge for just{" "}
          <span className="font-bold">$500</span> and unlock exciting benefits,
          including more than five posts!
        </p>
      </div>

      {/* User Information Section */}
      <div className="mt-8 flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-4xl">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-20 h-20 rounded-full border-4 border-[#76c550] mb-4 md:mb-0"
        />
        <div className="ml-0 md:ml-6 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#040903]">
            {user.displayName}
          </h2>
          <p className="text-text">{user.email}</p>
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-12 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-center text-[#76c550] mb-6">
          Membership Payment
        </h2>

        <Elements stripe={stripePromise}>
          {/* Stripe Checkout Form */}
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Membership;
