import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import sideLogo from "../../assets/login.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ThemeContext } from "../../provider/ThemeProvider";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, handleGoogleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { theme } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleSignIn = async () => {
    try {
      const result = await handleGoogleLogin();

      // Extract user info from the result
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
      };

      // Send user info to the backend
      await axiosPublic.post("/users", userInfo);

      // Show success alert using SweetAlert
      Swal.fire({
        title: "Success!",
        text: "Registered in with Google!",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        showConfirmButton: false,
      });

      // Navigate to the home page
      navigate("/");
    } catch (err) {
      // Show error alert using SweetAlert
      Swal.fire({
        title: "Error!",
        text: err.message || "Google sign-in failed.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await handleLogin(email, password).then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Logged in Successfully!",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`mt-16 w-full flex items-center justify-center ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full   md:flex-row flex-col bg-white shadow-lg rounded-lg flex overflow-hidden ${
          theme === "dark" ? "bg-gray-900 text-white" : ""
        }`}
      >
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full mb-6 md:mb-0 md:flex items-center justify-center bg-gray-100">
          <img
            src={sideLogo}
            alt="Side Illustration"
            className="w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-8 md:px-16">
          <h1
            className={`text-3xl font-semibold pt-5 text-center ${
              theme === "dark" ? "text-white" : "text-gray-800"
            } md:mb-8`}
          >
            Login to Your Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label
                className={`label ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="input input-bordered w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label
                className={`label ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="input input-bordered w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                className={`btn w-full py-3 rounded-lg hover:opacity-90 focus:outline-none transform hover:scale-105 transition-all duration-300 ease-in-out ${
                  theme === "dark"
                    ? "bg-teal-600"
                    : "bg-gradient-to-r from-teal-500 to-[#04d6d6] text-white"
                }`}
              >
                Login
              </button>
            </div>
          </form>
          <div className="my-4 text-center">
            <button
              onClick={handleGoogleSignIn}
              className={`btn w-full py-3 rounded-lg flex justify-center items-center hover:opacity-90 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-teal-600"
                  : "bg-gradient-to-r from-teal-500 to-[#04d6d6] text-white"
              }`}
            >
              <FcGoogle className="mr-3" fontSize="24" />
              Login With Google
            </button>
          </div>
          <p
            className={`text-center ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?
            <Link
              to="/register"
              className={`font-semibold ${
                theme === "dark" ? "text-teal-400" : "text-blue-500"
              } hover:underline`}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
