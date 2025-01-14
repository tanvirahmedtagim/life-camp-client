import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PopularCamps = () => {
  const navigate = useNavigate();

  // Sample data for popular camps
  const [camps, setCamps] = useState([
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
    },
    {
      id: 2,
      name: "Maternal Health Awareness",
      image: "/images/camp2.jpg",
      fees: "$15",
      date: "5th Feb 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Green Valley Clinic",
      professional: "Dr. Sarah Wilson",
      participants: 20,
    },
    {
      id: 3,
      name: "Senior Citizen Wellness Camp",
      image: "/images/camp3.jpg",
      fees: "$25",
      date: "10th Feb 2025",
      time: "11:00 AM - 5:00 PM",
      location: "Harmony Care Center",
      professional: "Dr. John Smith",
      participants: 15,
    },
    {
      id: 4,
      name: "Youth Mental Health Workshop",
      image: "/images/camp4.jpg",
      fees: "$30",
      date: "15th Feb 2025",
      time: "10:00 AM - 3:00 PM",
      location: "City Mental Wellness Center",
      professional: "Dr. Laura Brown",
      participants: 25,
    },
    {
      id: 5,
      name: "Diabetes Awareness Camp",
      image: "/images/camp5.jpg",
      fees: "$10",
      date: "20th Feb 2025",
      time: "8:00 AM - 2:00 PM",
      location: "HealthHub Center",
      professional: "Dr. Robert Lee",
      participants: 30,
    },
    {
      id: 6,
      name: "Cardiac Care Camp",
      image: "/images/camp6.jpg",
      fees: "$40",
      date: "28th Feb 2025",
      time: "9:00 AM - 1:00 PM",
      location: "Heartline Hospital",
      professional: "Dr. Alice Green",
      participants: 50,
    },
  ]);

  return (
    <div className="bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">
        Popular Medical Camps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.slice(0, 6).map((camp) => (
          <div
            key={camp.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{camp.name}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Fees:</span> {camp.fees}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Date:</span> {camp.date}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Time:</span> {camp.time}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Location:</span> {camp.location}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Healthcare Professional:</span>{" "}
                {camp.professional}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Participants:</span>{" "}
                {camp.participants}
              </p>
              <button
                onClick={() => navigate(`/camp-details/${camp.id}`)}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/availableCamps")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          See All Camps
        </button>
      </div>
    </div>
  );
};

export default PopularCamps;
