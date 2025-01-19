import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import RegisteredCampsRow from "./RegisteredCampsRow";

const RegisteredCampsTable = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: AllRegisteredCamps = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["AllRegisteredCamps"],
    queryFn: async () => {
      const response = await axiosSecure.get("/registered-camps");
      return response.data.registeredCamps;
    },
  });

  // Filter camps based on search query
  const filteredCamps = AllRegisteredCamps.filter((camp) => {
    const query = searchQuery.toLowerCase();
    return (
      camp.name.toLowerCase().includes(query) ||
      camp.participantName.toLowerCase().includes(query) ||
      camp.status.toLowerCase().includes(query)
    );
  });

  // Pagination logic
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full lg:ml-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Registered Camps</h1>

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by Camp Name, Participant Name, or Status"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Camp Name</th>
              <th className="border px-4 py-2">Camp Fees</th>
              <th className="border px-4 py-2">Participant Name</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Confirmation Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((camp) => (
              <RegisteredCampsRow
                key={camp._id}
                campData={camp}
                refetch={refetch}
              />
            ))}
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

export default RegisteredCampsTable;
