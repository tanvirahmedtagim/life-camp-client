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
  // console.log(registeredCamps);
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
    refetch(); // Refetch the data to update the payment status after successful payment
  };

  const handleFeedback = (campId) => {
    // Feedback handler logic here
  };

  return (
    <div className="w-full lg:ml-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Registered Camps</h1>
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
            {registeredCamps.map((camp) => (
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
                        setSelectedCamp(camp); // Set the selected camp
                        setIsOpen(true); // Open the modal
                      }}
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {camp.status}
                </td>
                <td className="px-4 py-2 flex lg:flex-row flex-col gap-2 border border-gray-300 ">
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
            ))}
          </tbody>
        </table>
      </div>
      <PaymentModal
        camp={selectedCamp} // Pass the selected camp
        closeModal={closeModal}
        isOpen={isOpen}
        refetch={refetch}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default RegisteredCamps;
