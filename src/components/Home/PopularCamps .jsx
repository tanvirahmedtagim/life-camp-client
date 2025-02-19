import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUserMd,
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../../provider/ThemeProvider";

const PopularCamps = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(ThemeContext); 

  const { data: home_camps = [], isPending: loading } = useQuery({
    queryKey: ["home_camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home-camps");
      return res.data;
    },
  });

  return (
    <div
      className={`mt-14 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : " text-gray-900"
      }`}
      id="popularCamps"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">
        Popular Medical Camps
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {home_camps.slice(0, 6).map((camp) => (
          <div
            key={camp._id}
            className={`shadow-lg rounded-lg overflow-hidden border transition-all duration-300
            ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white border-teal-200"
            }`}
          >
            <img
              src={camp.imageUrl}
              alt={camp.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-bold mb-3 text-teal-700">
                {camp.name}
              </h3>

              <p className="flex items-center mb-2">
                <FaDollarSign className="mr-2 text-teal-500" />
                <span className="font-semibold">Fees:</span> {camp.fees}
              </p>
              <p className="flex items-center mb-2">
                <FaCalendarAlt className="mr-2 text-teal-500" />
                <span className="font-semibold">Date:</span> {camp.dateTime}
              </p>
              <p className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-teal-500" />
                <span className="font-semibold">Location:</span> {camp.location}
              </p>
              <p className="flex items-center mb-2">
                <FaUserMd className="mr-2 text-teal-500" />
                <span className="font-semibold">
                  Healthcare Professional:
                </span>{" "}
                {camp.healthcareProfessionalName}
              </p>
              <p className="flex items-center mb-4">
                <FaUsers className="mr-2 text-teal-500" />
                <span className="font-semibold">Participants:</span>{" "}
                {camp.participantCount}
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(`/camp-details/${camp._id}`)}
                  className={`px-4 py-2 rounded-md transition-all duration-300
                  ${
                    theme === "dark"
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "bg-teal-500 hover:bg-teal-600 text-white"
                  }`}
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
          className={`px-6 py-2 rounded-md transition-all duration-300
          ${
            theme === "dark"
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-teal-500 hover:bg-teal-600 text-white"
          }`}
        >
          See All Camps
        </button>
      </div>
    </div>
  );
};

export default PopularCamps;
