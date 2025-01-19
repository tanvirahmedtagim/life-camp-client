import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import PaymentModal from "../../../../components/Dashboard/Payment/PaymentModal";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCamp(null);
  };

  const {
    data: registeredCamps = [],
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/registered-camps/${user?.email}`);
      return data.registeredCamps;
    },
  });

  const handleDelete = async (camp) => {
    try {
      await axiosSecure.delete(`/registered-camps/${camp._id}`);
      refetch();
      toast.success("Registration Cancelled.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to cancel registration");
    }
  };

  const handlePaymentSuccess = () => {
    refetch();
  };

  // Filter camps based on search query
  const filteredCamps = registeredCamps.filter((camp) => {
    const query = searchQuery.toLowerCase();
    return (
      camp.name.toLowerCase().includes(query) ||
      camp.participantName.toLowerCase().includes(query) ||
      camp.fees.toString().includes(query)
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
      <h1 className="text-3xl font-bold mb-4 text-center">Registered Camps</h1>

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by Camp Name, Participant Name, or Fees"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Camp Name</th>
              <th className="px-4 py-2 border border-gray-300">Fees</th>
              <th className="px-4 py-2 border border-gray-300">
                Participant Name
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Payment Status
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Confirmation Status
              </th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.length > 0 ? (
              paginatedCamps.map((camp) => (
                <tr key={camp._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {camp.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    ${camp.fees}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {camp.participantName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {camp.paymentStatus === "Paid" ? (
                      <span className="text-green-600 font-bold">Paid</span>
                    ) : (
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        onClick={() => {
                          setSelectedCamp(camp);
                          setIsOpen(true);
                        }}
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {camp.status}
                  </td>
                  <td className="px-4 py-2 flex lg:flex-row flex-col gap-2 border border-gray-300">
                    <button
                      className={`${
                        camp.paymentStatus === "Paid"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      } px-4 py-1 rounded`}
                      onClick={() => handleDelete(camp)}
                      disabled={camp.paymentStatus === "Paid"}
                    >
                      Cancel
                    </button>
                    {camp.paymentStatus === "Paid" &&
                      camp.status === "Confirmed" && (
                        <Link
                          to={`/dashboard/feedback/${camp._id}`}
                          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 text-center"
                        >
                          Feedback
                        </Link>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 border border-gray-300"
                >
                  No camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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

      {/* Payment Modal */}
      <PaymentModal
        camp={selectedCamp}
        closeModal={closeModal}
        isOpen={isOpen}
        refetch={refetch}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default RegisteredCamps;
