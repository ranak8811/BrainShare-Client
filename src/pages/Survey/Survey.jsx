import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Survey = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("Survey Data:", data);
    toast.success("Thank you for your feedback!");
    setSubmitted(true);
    reset();
  };
  console.log(submitted);

  return (
    <div className="bg-base-100 min-h-[calc(100vh-68px)] flex items-center justify-center px-6 py-12">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
          User Feedback Survey
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Satisfaction Level */}
          <div>
            <label className="block text-lg font-medium">
              How satisfied are you with our platform?
            </label>
            <select
              {...register("satisfaction")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
            >
              <option value="Very Satisfied">Very Satisfied</option>
              <option value="Satisfied">Satisfied</option>
              <option value="Neutral">Neutral</option>
              <option value="Dissatisfied">Dissatisfied</option>
              <option value="Very Dissatisfied">Very Dissatisfied</option>
            </select>
          </div>

          {/* Features Improvement */}
          <div>
            <label className="block text-lg font-medium">
              What features would you like to see improved?
            </label>
            <textarea
              {...register("improvements")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
              rows="3"
              placeholder="Enter your suggestions..."
            ></textarea>
          </div>

          {/* Recommend Platform */}
          <div>
            <label className="block text-lg font-medium">
              Would you recommend our platform to others?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Yes"
                  {...register("recommend")}
                  className="mr-2"
                />{" "}
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="No"
                  {...register("recommend")}
                  className="mr-2"
                />{" "}
                No
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-80 transition duration-300"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Survey;
