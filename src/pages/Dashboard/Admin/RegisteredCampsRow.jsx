import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

const RegisteredCampsRow = ({ campData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { name, fees, participantName, paymentStatus, status, _id } =
    campData || {};
  console.log(campData);

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    if (status === newStatus) return;
    try {
      await axiosSecure.patch(`/registered-camps/${_id}`, {
        status: newStatus,
      });
     
      toast.success("Status updated successfully");
       refetch(); 
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Failed to update status");
    }
  };

  // Handle cancellation
  const handleCancel = async () => {
    try {
      await axiosSecure.delete(`/registered-camps/${_id}`);
      refetch(); // Refetch data after cancellation
      toast.success("Registration canceled successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Failed to cancel registration");
    } finally {
      closeModal();
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${fees}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{participantName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {paymentStatus === "Paid" ? (
          <span className="text-green-500">Paid</span>
        ) : (
          <span className="text-red-500">Unpaid</span>
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <select
          required
          defaultValue={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={status === "Confirmed"}
          className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white"
          name="status"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirm</option>
        </select>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {paymentStatus === "Paid" && status === "Confirmed" ? (
          <button
            disabled
            className="bg-gray-400 text-white py-1 px-3 rounded cursor-not-allowed"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Cancel</span>
          </button>
        )}
        <DeleteModal
          handleDelete={handleCancel}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default RegisteredCampsRow;
