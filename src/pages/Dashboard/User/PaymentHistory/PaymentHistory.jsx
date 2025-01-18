import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered/${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Camp Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Camp Name</th>
              <th className="py-3 px-6 text-left">Fees</th>
              <th className="py-3 px-6 text-left">Payment Status</th>
              <th className="py-3 px-6 text-left">Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
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
                  <td
                    className={`py-3 px-6 ${
                      transaction.status === "Confirmed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {transaction.status}
                  </td>
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
    </div>
  );
};

export default PaymentHistory;
