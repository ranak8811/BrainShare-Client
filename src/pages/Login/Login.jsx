import { useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginLottieData from "../../assets/lottie/login.json";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useTitle from "../../../public/PageTitle/title";

const Login = () => {
  useTitle("Login");
  const { setUser, loginRegisteredUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  // Quick fill for Admin/User
  const handleQuickFill = (role) => {
    if (role === "admin") {
      setValue("email", "ranak@gmail.com");
      setValue("password", "helloNew@#2025");
    } else {
      setValue("email", "anwarhossain@gmail.com");
      setValue("password", "itsMe@#2024");
    }
    toast.success(`${role === "admin" ? "Admin" : "User"} credentials filled!`);
  };

  const onSubmit = async (data) => {
    try {
      const result = await loginRegisteredUser(data?.email, data?.password);
      setUser(result?.user);

      toast.success(`${result.user.displayName} is logged in successfully!`);

      navigate(location?.state ? location.state : "/");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred!");
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        <div className="bg-secondary flex items-center justify-center rounded-t-lg md:rounded-t-none md:rounded-l-lg p-6">
          <Lottie
            animationData={loginLottieData}
            className="max-w-full md:max-w-sm"
          />
        </div>

        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-primary text-center mb-4">
            Login
          </h2>

          {/* Quick Fill Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => handleQuickFill("admin")}
              className="btn bg-gray-100 btn-outline hover:btn-accent  text-black px-4"
            >
              Admin Login
            </button>
            <button
              onClick={() => handleQuickFill("user")}
              className="btn bg-gray-100 btn-outline hover:btn-accent  text-black px-4"
            >
              User Login
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <button
              type="submit"
              className="btn bg-primary hover:bg-secondary text-background w-full mt-4"
            >
              Login
            </button>
          </form>

          {/* Go Home Button */}
          <button
            onClick={() => navigate("/")}
            className="btn bg-gray-100 btn-outline hover:btn-accent text-black w-full mt-2"
          >
            Go to Homepage
          </button>

          <p className="text-center text-sm text-text mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary hover:text-secondary">
              Register here
            </Link>
          </p>

          <div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import Lottie from "lottie-react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import loginLottieData from "../../assets/lottie/login.json";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";
// import SocialLogin from "../../components/SocialLogin/SocialLogin";
// import useTitle from "../../../public/PageTitle/title";

// const Login = () => {
//   useTitle("Login");
//   const { setUser, loginRegisteredUser } = useAuth();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = async (data) => {
//     // console.log(data);

//     try {
//       const result = await loginRegisteredUser(data?.email, data?.password);
//       setUser(result?.user);

//       toast.success(
//         `${result.user.displayName} is logged in with email and password`
//       );

//       navigate(location?.state ? location.state : "/");
//     } catch (error) {
//       const errorMessage = error.message || "An unexpected error occurred!";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <div className="bg-background min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
//         <div className="bg-secondary flex items-center justify-center rounded-t-lg md:rounded-t-none md:rounded-l-lg p-6">
//           <Lottie
//             animationData={loginLottieData}
//             className="max-w-full md:max-w-sm"
//           />
//         </div>

//         <div className="p-6 flex flex-col justify-center">
//           <h2 className="text-2xl font-bold text-primary text-center mb-4">
//             Login
//           </h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label
//                 className="block text-sm font-medium text-text mb-1"
//                 htmlFor="email"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 className="input input-bordered w-full border-secondary focus:border-primary focus:outline-none"
//                 {...register("email", { required: "Email is required" })}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div className="relative">
//               <label
//                 className="block text-sm font-medium text-text mb-1"
//                 htmlFor="password"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 className="input input-bordered w-full border-secondary focus:border-primary focus:outline-none"
//                 {...register("password", { required: "Password is required" })}
//               />
//               <button
//                 type="button"
//                 className="absolute top-9 right-3 text-secondary hover:text-primary"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="btn bg-primary hover:bg-secondary text-background w-full mt-4"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-center text-sm text-text mt-4">
//             Don&apos;t have an account?{" "}
//             <Link to="/register" className="text-primary hover:text-secondary">
//               Register here
//             </Link>
//           </p>

//           <div>
//             <SocialLogin></SocialLogin>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
