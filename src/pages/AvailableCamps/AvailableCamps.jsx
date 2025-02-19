import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUserMd,
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import useCamp from "../../hooks/useCamp";
import { BounceLoader } from "react-spinners";
import { ThemeContext } from "../../provider/ThemeProvider"; // Import Theme Context

const AvailableCamps = () => {
  const [camps, loading] = useCamp(); // Ensure useCamp hook provides a loading state
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [layout, setLayout] = useState(
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  );

  const { theme } = useContext(ThemeContext); // Get theme from context

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleLayoutToggle = () => {
    setLayout(
      layout === "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    );
  };

  // Filter camps based on the search term
  const filteredCamps = camps
    .filter(
      (camp) =>
        camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.healthcareProfessional
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        camp.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortCriteria) {
        case "name":
          return a.name.localeCompare(b.name);
        case "participants":
          return b.participantCount - a.participantCount;
        case "fees":
          return b.fees - a.fees;
        default:
          return 0;
      }
    });

  // Show only the first 6 camps if `showAll` is false, else show all
  const campsToShow = showAll ? filteredCamps : filteredCamps.slice(0, 6);

  return (
    <div
      className={`w-11/12 mx-auto  py-8 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : " text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-600">
        Upcoming Medical Camps
      </h1>

      {loading ? (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="flex flex-col items-center justify-center">
            <BounceLoader size={100} color="#0b7f68" />
          </div>
        </div>
      ) : (
        <>
          {/* Search Bar & Sorting */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search camps by name, location, or professional"
              value={searchTerm}
              onChange={handleSearchChange}
              className={`p-2 rounded-md w-full sm:w-2/3 md:w-1/2 border ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />

            {/* Sort Dropdown */}
            <select
              value={sortCriteria}
              onChange={handleSortChange}
              className={`mt-4 sm:mt-0 p-2 rounded-md w-full sm:w-auto border ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            >
              <option value="name">Sort by Name</option>
              <option value="participants">Sort by Most Registered</option>
              <option value="fees">Sort by Camp Fees</option>
            </select>
          </div>

          {/* Layout Toggle Button */}
          <div className="mb-6 text-center">
            <button
              onClick={handleLayoutToggle}
              className={`py-2 px-6 rounded-full transition-all duration-300 ${
                theme === "dark"
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              }`}
            >
              Toggle Layout
            </button>
          </div>

          {/* Camps Grid */}
          <div className={`grid ${layout} gap-6`}>
            {campsToShow.map((camp) => (
              <div
                key={camp._id}
                className={`shadow-lg rounded-lg overflow-hidden transition-all duration-300 border ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white border-gray-300"
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
                    <span className="font-semibold">Location:</span>{" "}
                    {camp.location}
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
                    <Link
                      to={`/camp-details/${camp._id}`}
                      className={`py-2 px-6 rounded-full transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-teal-600 hover:bg-teal-700 text-white"
                          : "bg-teal-500 hover:bg-teal-600 text-white"
                      }`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More / Show Less Button */}
          {!loading && (
            <div className="text-center mt-8">
              <button
                onClick={handleToggle}
                className={`py-2 px-6 rounded-full transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AvailableCamps;
