import { useState } from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, loading, manageProfile } = useAuth();
  const [role, isLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(user.displayName || "");
  const [updatedEmail, setUpdatedEmail] = useState(user.email || "");
  const [updatedPhoto, setUpdatedPhoto] = useState(user.photoURL || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY; // Use the environment variable for your IMGBB API key

  if (loading || isLoading) return <LoadingSpinner />;

  const isGoogleUser = user?.providerData?.some(
    (provider) => provider.providerId === "google.com"
  );

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    setIsSaving(true);

    try {
      let updatedImageUrl = updatedPhoto; // Use existing image if no new file is uploaded

      // Upload to IMGBB if a file is selected
      if (selectedFile) {
        const imageFile = new FormData();
        imageFile.append("image", selectedFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          imageFile,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );

        if (res.data.success) {
          updatedImageUrl = res.data.data.url; // Get the image URL from the response
        } else {
          throw new Error("Failed to upload image to IMGBB");
        }
      }

      // Update in Firebase Authentication
      await manageProfile(updatedName, updatedImageUrl);

      // Save to backend
      await axiosSecure.put("/users", {
        displayName: updatedName,
        email: updatedEmail, // Email won't be updated now
        photoURL: updatedImageUrl,
        uid: user.uid,
      });

      // Show success toast and close modal
      Swal.fire("Profile updated successfully!", "", "success");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 md:px-0">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md md:max-w-2xl lg:max-w-3xl">
        <img
          alt="cover photo"
          className="w-full mb-4 rounded-t-lg h-40 md:h-48 lg:h-56 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-4 border-white"
            />
          </a>

          <p className="p-2 px-4 text-xs md:text-sm text-white bg-teal-500 rounded-full mt-2">
            {role}
          </p>
          <p className="mt-4 text-base md:text-xl font-medium text-gray-800 text-center">
            User ID: {user.uid}
          </p>
          <div className="w-full px-4 mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-600 gap-4">
              <p className="flex flex-col text-center md:text-left">
                Name
                <span className="font-bold text-black">{user.displayName}</span>
              </p>
              <p className="flex flex-col text-center md:text-left">
                Email
                <span className="font-bold text-black">{user.email}</span>
              </p>
            </div>
            <div className="flex justify-center items-center mt-6 gap-4">
              <button
                className={`px-8 py-2 rounded-lg font-medium w-full md:w-auto ${
                  isGoogleUser
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-teal-500 text-white hover:bg-teal-600"
                }`}
                disabled={isGoogleUser}
                onClick={() => setIsModalOpen(true)}
              >
                Update Profile
              </button>
              {/* <button
                className={`px-6 py-2 rounded-lg font-medium w-full md:w-auto ${
                  isGoogleUser
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-teal-500 text-white hover:bg-teal-600"
                }`}
                disabled={isGoogleUser}
              >
                Change Password
              </button> */}
            </div>
            {isGoogleUser && (
              <p className="mt-4 text-sm text-red-500 text-center">
                Cannot update profile when logged in with Google.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <div className="flex flex-col gap-4">
              <label className="block">
                <span className="text-gray-600">Name</span>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </label>
              <label className="block">
                <span className="text-gray-600">Email</span>
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                  readOnly // Make email read-only
                />
              </label>
              <label className="block">
                <span className="text-gray-600">Profile Picture</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </label>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-6 py-2 text-white rounded-lg ${
                  isSaving ? "bg-gray-500" : "bg-teal-500 hover:bg-teal-600"
                }`}
                onClick={handleUpdateProfile}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
