import Lottie from "lottie-react";
import newslettersLottieFiles from "../../assets/lottie/newsletter.json";
import toast from "react-hot-toast";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Subscribed successfully!");
    setEmail(""); // Clear input after submission
  };
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center bg-base-100 text-primary px-6 py-8 rounded-lg shadow-lg">
      <div className="w-56 md:w-72">
        <Lottie animationData={newslettersLottieFiles} loop />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-center mt-4">
        Subscribe to Our Newsletter
      </h2>

      <p className="text-center text-gray-900 mt-2">
        Stay updated with the latest posts and announcements!
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row gap-4 w-full max-w-md mt-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-primary text-white py-3 px-6 rounded-md hover:bg-secondary-dark transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
