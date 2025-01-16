// import sideLogo from "../../assets/others/authentication2.png";
// import bgImg from "../../assets/others/authentication.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const { handleRegister, manageProfile, loading, handleGoogleLogin } =
    useAuth();
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!data.file || data.file.length === 0) {
        console.error("No file selected!");
        return;
      }

      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("upload_preset", "life_camp");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_PRIVATE_KEY
        }/image/upload`,
        formData
      );

      const photo = response.data.url;
      const email = data.email;
      const password = data.password;

      await handleRegister(email, password);

      await manageProfile(data.name, photo);

      // create user entry in the database
      const userInfo = {
        name: data.name,
        email: email,
        photoURL: photo,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          // console.log("user added to the database");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div
      className="min-h-screen relative w-full flex items-center justify-center bg-cover bg-center"
      //   style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div
        className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden"
        // style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* Left Side - Image */}
        <div
          className="w-1/2 hidden md:flex items-center justify-center bg-gray-100"
          //   style={{ backgroundImage: `url(${bgImg})` }}
        >
          <img
            // src={sideLogo}
            alt="Side Illustration"
            className="w-3/4 h-auto"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-4">
            <h1 className="text-2xl font-bold text-center">
              Register Your Account
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                placeholder="name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Choose Photo</span>
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                {...register("file", { required: true })}
              />
              {errors.photo && (
                <span className="text-red-500">Photo is required</span>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password Password must be more than 8 character
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500">
                  Password must be less than 20 character
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500">
                  Password must have 1 uppercase,lowercase,number and special
                  character
                </span>
              )}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute bottom-4 right-3 "
              >
                {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </span>
            </div>
            <div className="form-control mt-6">
              <button className="btn text-white hover:bg-orange-600 bg-orange-500">
                Register
              </button>
            </div>
          </form>
          <div className="my-1 mx-8 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500 text-white py-3 rounded-lg flex justify-center items-center hover:opacity-90 transition-all duration-300"
            >
              <FcGoogle className="mr-3" fontSize="24" />
              Register With Google
            </button>
          </div>
          <p className="text-center text-orange-500 pb-4">
            Already Have An Account?
            <Link className="font-bold text-gray-700" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
