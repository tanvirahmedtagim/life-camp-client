import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCamp = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Form submit handler
  // const onSubmit = async (data) => {
  //   try {
  //     if (!data.image || data.image.length === 0) {
  //       toast.error("Please select an image!");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("file", data.image[0]);
  //     formData.append("upload_preset", "life_camp");

  //     const imageUploadResponse = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${
  //         import.meta.env.VITE_PRIVATE_KEY
  //       }/image/upload`,
  //       formData
  //     );

  //     const imageUrl = imageUploadResponse.data.url;

  //     const campData = {
  //       name: data.campName,
  //       fees: data.campFees,
  //       dateTime: data.dateTime,
  //       location: data.location,
  //       healthcareProfessionalName: data.healthcareProfessionalName,
  //       participantCount: 0,
  //       description: data.description,
  //       imageUrl,
  //     };

  //     const response = await axiosSecure.post("/camps", campData);

  //     if (response.data.insertedId) {
  //       Swal.fire({
  //         title: "Camp Created!",
  //         text: "Your camp has been successfully added!",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       });

  //       reset();
  //     } else {
  //       toast.error("Failed to save camp data. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred. Please try again.");
  //   }
  // };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const imageFile = { image: data.image[0] };
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        imageFile,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        // now send the menu item data to the server with the image url
        const campData = {
          name: data.name,
          fees: data.fees,
          dateTime: data.dateTime,
          location: data.location,
          healthcareProfessionalName: data.healthcareProfessionalName,
          participantCount: 0,
          description: data.description,
          imageUrl: res.data.data.display_url,
        };
        //
        const campRes = await axiosSecure.post("/camps", campData);
        console.log(campRes.data);
        if (campRes.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} is Added Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          // show success popup
          reset();
          navigate("/dashboard/manage-camps");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full md:w-11/12 bg-white rounded-lg shadow-lg p-8">
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="loader border-t-8 border-teal-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
          </div>
        )}
        <h2 className="text-3xl font-bold mb-6 text-center">Add a New Camp</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Camp Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Camp Name</label>
            <input
              type="text"
              {...register("name", { required: "Camp Name is required" })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter camp name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Camp Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Camp Image</label>
            <input
              type="file"
              {...register("image", { required: "Camp image is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Camp Fees */}
          <div>
            <label className="block text-sm font-medium mb-1">Camp Fees</label>
            <input
              type="number"
              {...register("fees", { required: "Camp fees is required" })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter camp fees"
            />
            {errors.fees && (
              <p className="text-red-500 text-sm">{errors.fees.message}</p>
            )}
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              {...register("dateTime", {
                required: "Date and Time is required",
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.dateTime && (
              <p className="text-red-500 text-sm">{errors.dateTime.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter camp location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Healthcare Professional Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Healthcare Professional Name
            </label>
            <input
              type="text"
              {...register("healthcareProfessionalName", {
                required: "Healthcare professional name is required",
              })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter healthcare professional name"
            />
            {errors.healthcareProfessionalName && (
              <p className="text-red-500 text-sm">
                {errors.healthcareProfessionalName.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Describe the camp"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Camp
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCamp;
