import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log("Error  caught in our interceptors: " + error.response);

        if (error.response.status === 401 || error.response.status === 403) {
          logOutUser();
          navigate("/login");
        }
      }
    );
  }, [logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
