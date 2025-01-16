import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCamp from "../../hooks/useCamp";

const CampDetails = () => {
  const {
    name,
    fees,
    dateTime,
    location,
    healthcareProfessionalName,
    description,
    participants ,
    _id,
    imageUrl,
  } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();

  // Replace with actual API data or context
  const [camps] = useCamp();

  if (!camps) {
    return <div className="text-center mt-10">Camp not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
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
        <strong>Healthcare Professional:</strong>{" "}
        {healthcareProfessionalName}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Participants:</strong> {participants}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Description:</strong> {description}
      </p>
      <button
        className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
        onClick={() => setIsModalOpen(true)}
      >
        Join Camp
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white mt-16 rounded-lg p-6 w-4/5 mx-auto relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">
              Register for {name}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Camp Name
                </label>
                <input
                  type="text"
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
                    placeholder="Enter your age"
                    className="w-full border rounded px-3 py-2 text-gray-700"
                  />
                </div>
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="number"
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
                  <select className="w-full border rounded px-3 py-2 text-gray-700">
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
                    placeholder="Enter emergency contact number"
                    className="w-full border rounded px-3 py-2 text-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  onClick={() => alert("Registration Successful!")}
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
