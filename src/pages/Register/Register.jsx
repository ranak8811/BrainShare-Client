import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import registerLottieData from "../../assets/lottie/register.json";
import { imageUpload, saveUserToDatabase } from "../../api/utils";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useTitle from "../../../public/PageTitle/title";

const Register = () => {
  useTitle("Register");
  const { registerNewUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const photoURL = await imageUpload(data?.image[0]);
    // console.log(photoURL);
    // console.log(data.image);

    try {
      //2. User Registration
      const result = await registerNewUser(data?.email, data?.password);

      //3. Save username & profile photo
      await updateUserProfile({
        displayName: data?.name,
        photoURL: photoURL,
      });
      console.log(result);

      // save user information in db if user is new
      await saveUserToDatabase({
        ...result?.user,
        displayName: data?.name,
        photoURL,
      });

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        <div className="bg-secondary flex items-center justify-center rounded-t-lg md:rounded-t-none md:rounded-l-lg p-6">
          <Lottie
            animationData={registerLottieData}
            className="max-w-full md:max-w-sm"
          />
        </div>

        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-primary text-center mb-4">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-text mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full border-secondary focus:border-primary focus:outline-none"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-text mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-secondary focus:border-primary focus:outline-none"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                className="block text-sm font-medium text-text mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full border-secondary focus:border-primary focus:outline-none"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-secondary hover:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-text mb-1"
                htmlFor="image"
              >
                Upload Image
              </label>
              <input
                id="image"
                type="file"
                className="file-input file-input-bordered w-full border-secondary focus:border-primary focus:outline-none"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-primary hover:bg-secondary text-background w-full mt-4"
            >
              Register
            </button>

            {/* Go Home Button */}
            <button
              onClick={() => navigate("/")}
              className="btn bg-gray-100 btn-outline hover:btn-accent text-black w-full mt-2"
            >
              Go to Homepage
            </button>
          </form>

          <p className="text-center text-sm text-text mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-secondary">
              Login here
            </Link>
          </p>
          <div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
