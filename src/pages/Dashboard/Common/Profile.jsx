import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 md:px-0">
      {/* <Helmet>
        <title>Profile</title>
      </Helmet> */}
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md md:max-w-2xl lg:max-w-3xl">
        <img
          alt="cover photo"
          // src={coverImg}
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
            <div className="flex flex-col md:flex-row md:justify-between items-center mt-6 gap-4">
              <button className="bg-teal-500 px-8 py-2 rounded-lg text-white font-medium hover:bg-teal-600 w-full md:w-auto">
                Update Profile
              </button>
              <button className="bg-teal-500 px-6 py-2 rounded-lg text-white font-medium hover:bg-teal-600 w-full md:w-auto">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
