import React from "react";
import useCamp from "../../../hooks/useCamp";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageCamps = () => {
  const [camps, , refetch] = useCamp();
  const axiosSecure = useAxiosSecure();
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
            title: `${camp.campName} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div className="w-full lg:ml-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center ">All Camps</h1>
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
            {camps.length > 0 ? (
              camps.map((camp) => (
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
    </div>
  );
};

export default ManageCamps;
