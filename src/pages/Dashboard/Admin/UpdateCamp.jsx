import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const UpdateCamp = () => {
  const [loading, setLoading] = useState();

  const {
    name,
    fees,
    dateTime,
    location,
    healthcareProfessionalName,
    description,
    _id,
    imageUrl,
  } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Upload new image if provided
      let updatedImageUrl = imageUrl; // Use existing image if no new file is uploaded
      if (data.image && data.image[0]) {
        const imageFile = new FormData();
        imageFile.append("image", data.image[0]);

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
          updatedImageUrl = res.data.data.display_url;
        } else {
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }

      // Prepare updated camp data
      const updatedCampData = {
        name: data.name,
        fees: data.fees,
        dateTime: data.dateTime,
        location: data.location,
        healthcareProfessionalName: data.healthcareProfessionalName,
        description: data.description,
        imageUrl: updatedImageUrl,
      };

      // Update camp data in the database
      const campRes = await axiosSecure.patch(`/camps/${_id}`, updatedCampData);
      if (campRes.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} has been updated successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-camps");
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
        <h2 className="text-3xl font-bold mb-6 text-center">Update Camp</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Camp Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Camp Name</label>
            <input
              type="text"
              defaultValue={name}
              {...register("name", { required: "Camp Name is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Camp Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Camp Image</label>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Current Camp"
                className="w-32 h-32 object-cover mb-2"
              />
            )}
            <input
              type="file"
              {...register("image")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Camp Fees */}
          <div>
            <label className="block text-sm font-medium mb-1">Camp Fees</label>
            <input
              type="number"
              defaultValue={fees}
              {...register("fees", { required: "Camp fees is required" })}
              className="w-full px-4 py-2 border rounded-lg"
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
              defaultValue={dateTime}
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
              defaultValue={location}
              {...register("location", { required: "Location is required" })}
              className="w-full px-4 py-2 border rounded-lg"
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
              defaultValue={healthcareProfessionalName}
              {...register("healthcareProfessionalName", {
                required: "Healthcare professional name is required",
              })}
              className="w-full px-4 py-2 border rounded-lg"
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
              defaultValue={description}
              className="w-full px-4 py-2 border rounded-lg"
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
            className="w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
          >
            Update Camp
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateCamp;
