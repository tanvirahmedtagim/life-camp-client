import React from "react";
import useCamp from "../../../hooks/useCamp";

const ManageCamps = () => {
  const [camps] = useCamp();
  return (
    <div className="w-full lg:ml-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Camps</h1>
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
                <tr key={camp.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{camp.name}</td>
                  <td className="px-4 py-2">{camp.dateTime}</td>
                  <td className="px-4 py-2">{camp.location}</td>
                  <td className="px-4 py-2">
                    {camp.healthcareProfessionalName}
                  </td>
                  <td className="px-4 flex gap-2 lg:flex-row flex-col py-2 text-center">
                    <button
                      onClick={() => handleUpdate(camp._id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(camp._id)}
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
