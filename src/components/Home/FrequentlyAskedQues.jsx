import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is Brainshare?",
    answer:
      "Brainshare is a social platform where users can share posts, comment, upvote, and engage with a community. Premium users get extra benefits through our gold badge membership.",
  },
  {
    question: "How can I become a gold badge member?",
    answer:
      "To become a gold badge member, you need to subscribe via Stripe payment. This unlocks premium features like exclusive content and enhanced privileges.",
  },
  {
    question: "Can I edit or delete my posts?",
    answer:
      "Yes, you can edit or delete your posts anytime from your profile dashboard.",
  },
  {
    question: "What actions can an admin take?",
    answer:
      "Admins can manage users, delete reported comments, and promote users to admin roles.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Absolutely! We use Stripe for payments, ensuring secure and encrypted transactions.",
  },
];

const FrequentlyAskedQues = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-base-100 p-6 md:p-10 rounded-lg shadow-lg ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>

            {openIndex === index && (
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQues;
