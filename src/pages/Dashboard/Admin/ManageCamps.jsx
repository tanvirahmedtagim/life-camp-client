import React, { useState } from "react";
import useCamp from "../../../hooks/useCamp";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageCamps = () => {
  const [camps, , refetch] = useCamp();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const handleDeleteCamp = (camp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/camps/${camp._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Camp has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  // Filter camps based on search query
  const filteredCamps = camps.filter((camp) => {
    const query = searchQuery.toLowerCase();
    return (
      camp.name.toLowerCase().includes(query) ||
      camp.location.toLowerCase().includes(query) ||
      camp.healthcareProfessionalName.toLowerCase().includes(query)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCamps = filteredCamps.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Change page handler
  const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full lg:ml-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center ">All Camps</h1>

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by Camp Name, Location, or Healthcare Professional"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Date & Time</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Healthcare Professional</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.length > 0 ? (
              paginatedCamps.map((camp) => (
                <tr key={camp._id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{camp.name}</td>
                  <td className="px-4 py-2">{camp.dateTime}</td>
                  <td className="px-4 py-2">{camp.location}</td>
                  <td className="px-4 py-2">
                    {camp.healthcareProfessionalName}
                  </td>
                  <td className="px-4 flex gap-2 lg:flex-row flex-col py-2 text-center">
                    <Link to={`/dashboard/update-camp/${camp._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteCamp(camp)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No camps available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded-l-md"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded-r-md"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageCamps;
