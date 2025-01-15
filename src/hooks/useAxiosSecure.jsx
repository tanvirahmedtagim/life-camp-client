import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log("Error caught from axios interceptor-->", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          handleLogout();
          // navigate to login
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [handleLogout, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
