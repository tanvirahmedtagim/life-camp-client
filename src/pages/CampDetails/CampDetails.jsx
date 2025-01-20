import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCamp from "../../hooks/useCamp";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [camps] = useCamp();

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
  // handle form submit

  const handleRegisteredCamp = async (e) => {
    e.preventDefault();

    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const fees = form.fees.value;
    const location = form.location.value;
    const healthcareProfessionalName = form.healthcareProfessionalName.value;
    const age = form.age.value;
    const emergencyContact = form.emergencyContact.value;
    const gender = form.gender.value;
    const phone = form.phone.value;

    // Create plant data object
    const registeredCamp = {
      name,
      location,
      fees,
      healthcareProfessionalName,
      age,
      campId: _id,
      emergencyContact,
      gender,
      phone,
      status: "Pending",
      participantName: user?.displayName,
      participantEmail: user?.email,
    };

    // save plant in db
    try {
      // post req
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
    } finally {
      setLoading(false);
    }
  };

  if (!camps) {
    return <div className="text-center mt-10">Camp not found!</div>;
  }

  return (
    <div className="max-w-4xl  mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-3xl font-bold mb-4">{name}</h2>
      <p className="text-gray-600 mb-2">
        <strong>Fees:</strong> {fees}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Date:</strong> {dateTime}
      </p>

      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {location}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Healthcare Professional:</strong> {healthcareProfessionalName}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Participants:</strong> {participantCount}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Description:</strong> {description}
      </p>
      <button
        className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
        onClick={handleJoinCampClick}
      >
        Join Camp
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white mt-16 rounded-lg p-6 w-4/5 mx-auto relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">Register for {name}</h2>
            <form onSubmit={handleRegisteredCamp}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Camp Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  readOnly
                  className="w-full border rounded px-3 py-2 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Camp Fees
                </label>
                <input
                  type="text"
                  name="fees"
                  value={fees}
                  readOnly
                  className="w-full border rounded px-3 py-2 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  readOnly
                  className="w-full border rounded px-3 py-2 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Healthcare Professional
                </label>
                <input
                  type="text"
                  name="healthcareProfessionalName"
                  value={healthcareProfessionalName}
                  readOnly
                  className="w-full border rounded px-3 py-2 text-gray-700"
                />
              </div>
              <div className="flex gap-4">
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Participant Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="w-full border rounded px-3 py-2 text-gray-700"
                  />
                </div>
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Participant Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full border rounded px-3 py-2 text-gray-700"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    required
                    name="age"
                    placeholder="Enter your age"
                    className="w-full border rounded px-3 py-2 text-gray-700"
                  />
                </div>
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    
                    required
                    type="number"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full border rounded px-3 py-2 text-gray-700"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Gender
                  </label>
                  <select
                    required
                    className="w-full border rounded px-3 py-2 text-gray-700"
                    name="gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="number"
                    
                    required
                    name="emergencyContact"
                    placeholder="Enter emergency contact number"
                    className="w-full border rounded px-3 py-2 text-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
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
