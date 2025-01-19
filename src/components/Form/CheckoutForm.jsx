// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/axiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const amount = 500;

  useEffect(() => {
    getPaymentIntent();
  }, []);
  // console.log(clientSecret);
  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post(`/create-payment-intent`, {
        amount,
      });
      //   return data;
      //   console.log(data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    // console.log(paymentIntent);

    const userInfo = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      amount: amount,
    };

    console.log(userInfo);

    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.post(`/save-payment-history`, {
          ...userInfo,
          transactionId: paymentIntent?.id,
        });
        toast.success("Your payment history has been saved");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("Payment method error", error.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-outline"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay 500$
      </button>
    </form>
  );
};

export default CheckoutForm;
