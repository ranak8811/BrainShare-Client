import { useState, useEffect } from "react";
import "animate.css";

const reviews = [
  {
    name: "Sarah Khan",
    review:
      "Brainshare is an amazing platform! It helped me connect with like-minded individuals and gain insights into various topics.",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
  },
  {
    name: "James Smith",
    review:
      "Posting and engaging with others is so easy. I highly recommend this platform to everyone!",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
  },
  {
    name: "Ayesha Rahman",
    review:
      "The premium membership is totally worth it! I love the exclusive features and the seamless experience.",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 4,
  },
];

const Review = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const reviewSection = document.querySelector(".bg-base-100.py-10"); // Select your review section
      if (reviewSection) {
        const rect = reviewSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if the section is at least partially in the viewport
        if (rect.top <= viewportHeight && rect.bottom >= 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset when out of view
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
  }, []); // Empty dependency array ensures this runs only once on mount and unmount

  return (
    <div className="bg-base-100 py-10">
      <h2
        className={`text-3xl md:text-4xl font-bold text-center text-primary mb-6 ${
          isVisible ? "animate__animated animate__fadeInDown" : ""
        }`}
      >
        What Our Users Say
      </h2>

      {/* ... rest of your review content, apply isVisible similarly ... */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {reviews.map((user, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-lg ${
              isVisible ? "animate__animated animate__zoomIn" : ""
            }`}
            style={{ animationDelay: `${index * 0.2}s` }} // Delay effect
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full border-2 border-primary"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-yellow-500">
                  {"★".repeat(user.rating)}{" "}
                  <span className="text-gray-400">
                    {"☆".repeat(5 - user.rating)}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{user.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
