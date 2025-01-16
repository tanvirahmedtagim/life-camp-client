import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCamp from "../../hooks/useCamp";

const AvailableCamps = () => {
  const [camps] = useCamp();
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [layout, setLayout] = useState(
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  );

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
          return a.fees - b.fees;
        default:
          return 0;
      }
    });

  // Show only the first 6 camps if `showAll` is false, else show all
  const campsToShow = showAll ? filteredCamps : filteredCamps.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Upcoming Medical Camps
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search camps by name, location, or professional"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-2/3 md:w-1/2"
        />

        {/* Sort Dropdown */}
        <select
          value={sortCriteria}
          onChange={handleSortChange}
          className="mt-4 sm:mt-0 p-2 border border-gray-300 rounded-md w-full sm:w-auto"
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
          className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition"
        >
          Toggle Layout
        </button>
      </div>

      {/* Camps Grid */}
      <div className={`grid ${layout} gap-6`}>
        {campsToShow.map((camp, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={camp.imageUrl}
              alt={camp.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{camp.name}</h2>
              <p className="text-gray-600 text-sm">{camp.dateTime}</p>
              <p className="text-gray-600 text-sm">{camp.location}</p>
              <p className="text-gray-600 text-sm">
                Healthcare Professional: {camp.healthcareProfessional}
              </p>
              <p className="text-gray-600 text-sm">
                Participants: {camp.participantCount}
              </p>
              <p className="text-gray-600 text-sm">{camp.description}</p>
              <div className="mt-4">
                <Link
                  to={`/camps/${camp._id}`} 
                  className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleToggle}
          className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition"
        >
          {showAll ? "Show Less" : "View More"}
        </button>
      </div>
    </div>
  );
};

export default AvailableCamps;
