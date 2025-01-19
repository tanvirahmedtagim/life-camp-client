import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const PopularCamps = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    data: home_camps = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["home_camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home-camps");
      return res.data;
    },
  });

  return (
    <div className="" id="popularCamps">
      <h2 className="text-3xl font-bold text-center mb-8">
        Popular Medical Camps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {home_camps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={camp.imageUrl}
              alt={camp.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-3">{camp.name}</h3>
              <p className="text-gray-600 flex items-center mb-2">
                <FaDollarSign className="mr-2 text-teal-500" />
                <span className="font-semibold">Fees:</span> {camp.fees}
              </p>
              <p className="text-gray-600 flex items-center mb-2">
                <FaCalendarAlt className="mr-2 text-teal-500" />
                <span className="font-semibold">Date:</span> {camp.dateTime}
              </p>

              <p className="text-gray-600 flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-teal-500" />
                <span className="font-semibold">Location:</span> {camp.location}
              </p>
              <p className="text-gray-600 flex items-center mb-2">
                <FaUserMd className="mr-2 text-teal-500" />
                <span className="font-semibold">
                  Healthcare Professional:
                </span>{" "}
                {camp.healthcareProfessionalName}
              </p>
              <p className="text-gray-600 flex items-center mb-4">
                <FaUsers className="mr-2 text-teal-500" />
                <span className="font-semibold">Participants:</span>{" "}
                {camp.participantCount}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(`/camp-details/${camp.id}`)}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/availableCamps")}
          className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
        >
          See All Camps
        </button>
      </div>
    </div>
  );
};

export default PopularCamps;
