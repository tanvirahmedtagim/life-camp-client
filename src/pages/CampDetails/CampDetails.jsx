import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CampDetails = () => {
  const { campId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulated logged-in user info
  const loggedInUser = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  // Replace with actual API data or context
  const camps = [
    {
      id: 1,
      name: "Community Wellness Camp",
      image: "/images/camp1.jpg",
      fees: "$20",
      date: "25th Jan 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Downtown Health Center",
      professional: "Dr. Emily Carter",
      participants: 10,
      description:
        "A camp focusing on community wellness with expert guidance.",
    },
    // Add additional camp data here...
  ];

  const camp = camps.find((c) => c.id === parseInt(campId));

  if (!camp) {
    return <div className="text-center mt-10">Camp not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
      <img
        src={camp.image}
        alt={camp.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-3xl font-bold mb-4">{camp.name}</h2>
      <p className="text-gray-600 mb-2">
        <strong>Fees:</strong> {camp.fees}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Date:</strong> {camp.date}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Time:</strong> {camp.time}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {camp.location}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Healthcare Professional:</strong> {camp.professional}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Participants:</strong> {camp.participants}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Description:</strong> {camp.description}
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
              Register for {camp.name}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Camp Name
                </label>
                <input
                  type="text"
                  value={camp.name}
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
                  value={camp.fees}
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
                  value={camp.location}
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
                  value={camp.professional}
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
                    value={loggedInUser.name}
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
                    value={loggedInUser.email}
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
                    type="text"
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
                    type="text"
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
