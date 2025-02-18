import React, { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { ThemeContext } from "../../provider/ThemeProvider";

const CampDetails = () => {
  const {
    name,
    fees,
    dateTime,
    location,
    healthcareProfessionalName,
    description,
    participantCount,
    _id,
    imageUrl,
  } = useLoaderData();

  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleJoinCampClick = () => {
    if (!user) {
      Swal.fire({
        title: "Please log in",
        text: "You need to log in to register for this camp.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRegisteredCamp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const registeredCamp = {
      name: form.name.value,
      location: form.location.value,
      fees: form.fees.value,
      healthcareProfessionalName: form.healthcareProfessionalName.value,
      age: form.age.value,
      campId: _id,
      emergencyContact: form.emergencyContact.value,
      gender: form.gender.value,
      phone: form.phone.value,
      status: "Pending",
      participantName: user?.displayName,
      participantEmail: user?.email,
    };

    try {
      const campRegRes = await axiosSecure.post(
        "/registered-camps",
        registeredCamp
      );
      if (campRegRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${form.name.value} is Registered Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/availableCamps");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!name) {
    return <div className="text-center mt-10">Camp not found!</div>;
  }

  return (
    <div
      className={` ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
      }rounded-xl shadow-lg mt-16`}
    >
      <div className="lg:flex-row flex-col flex gap-5 rounded-lg mt-[72px]">
        <div className="lg:w-1/2 ">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-lg mb-4"
          />
        </div>
        <div className="lg:w-1/2 p-3">
          {" "}
          <h2 className="text-3xl font-bold mb-4">{name}</h2>
          <p className="mb-2">
            <strong>Fees:</strong> {fees}
          </p>
          <p className="mb-2">
            <strong>Date:</strong> {dateTime}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {location}
          </p>
          <p className="mb-2">
            <strong>Healthcare Professional:</strong>{" "}
            {healthcareProfessionalName}
          </p>
          <p className="mb-2">
            <strong>Participants:</strong> {participantCount}
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {description}
          </p>
          <button
            className={`bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 ${
              theme === "dark" ? "bg-teal-600" : ""
            }`}
            onClick={handleJoinCampClick}
          >
            Join Camp
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className={`bg-white mt-16 rounded-lg p-6 w-4/5 mx-auto relative overflow-y-auto max-h-[90vh] ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Register for {name}</h2>
            <form onSubmit={handleRegisteredCamp}>
              {/* Form fields */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className={`bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 ${
                    theme === "dark" ? "bg-teal-600" : ""
                  }`}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
