import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const usePostCount = () => {
  const { user } = useAuth();

  // fetch user details
  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/userInfo/${user?.email}`
      );
      return data.userInfo;
    },
  });

  const { postCount = 0, badge = "" } = userData;

  return [postCount, badge, isLoading];
};

export default usePostCount;
