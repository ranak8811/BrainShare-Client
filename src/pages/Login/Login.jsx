import { useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginLottieData from "../../assets/lottie/login.json";
import SocialLogin from "../../components/Navbar/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser, loginRegisteredUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await loginRegisteredUser(data?.email, data?.password);
      setUser(result?.user);

      toast.success(
        `${result.user.displayName} is logged in with email and password`
      );

      navigate(location?.state ? location.state : "/");
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        {/* Lottie Animation */}
        <div className="bg-secondary flex items-center justify-center rounded-t-lg md:rounded-t-none md:rounded-l-lg p-6">
          <Lottie
            animationData={loginLottieData}
            className="max-w-full md:max-w-sm"
          />
        </div>

        {/* Login Form */}
        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-primary text-center mb-4">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-primary hover:bg-secondary text-background w-full mt-4"
            >
              Login
            </button>
          </form>

          {/* Toggle between Register and Login */}
          <p className="text-center text-sm text-text mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary hover:text-secondary">
              Register here
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

export default Login;
