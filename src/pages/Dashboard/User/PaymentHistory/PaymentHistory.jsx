import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state
  const [currentPage, setCurrentPage] = useState(1); // Manage current page state
  const itemsPerPage = 10; // Number of items to show per page

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered/${user.email}`);
      return res.data;
    },
  });

  // Filter transactions based on the search query
  const filteredTransactions = transactions.filter((transaction) => {
    const query = searchQuery.toLowerCase();
    return (
      transaction.campName.toLowerCase().includes(query) ||
      transaction.fees.toString().includes(query) ||
      transaction.paymentStatus.toLowerCase().includes(query)
    );
  });

  // Paginate the filtered transactions
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Camp Payment History</h2>

      {/* Search input */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by Camp Name, Fees, or Payment Status"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Camp Name</th>
              <th className="py-3 px-6 text-left">Fees</th>
              <th className="py-3 px-6 text-left">Payment Status</th>
              <th className="py-3 px-6 text-left">Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6">{transaction.campName}</td>
                  <td className="py-3 px-6">${transaction.fees}</td>
                  <td
                    className={`py-3 px-6 ${
                      transaction.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.paymentStatus}
                  </td>
                  <td className="py-3 px-6">{transaction.transactionId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                  No payment history available.
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
    </div>
  );
};

export default PaymentHistory;
