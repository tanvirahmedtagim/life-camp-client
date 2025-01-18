import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import RegisteredCampsRow from "./RegisteredCampsRow";

const RegisteredCampsTable = () => {
  const axiosSecure = useAxiosSecure();

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full lg:ml-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Registered Camps</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Camp Name</th>
              <th className="border px-4 py-2">Camp Fees</th>
              <th className="border px-4 py-2">Participant Name</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2"> Status</th>
              <th className="border px-4 py-2">Confirmation Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {AllRegisteredCamps.map((camp) => (
              <RegisteredCampsRow
                key={camp._id}
                campData={camp}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCampsTable;
