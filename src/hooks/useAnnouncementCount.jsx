import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAnnouncementCount = () => {
  // fetch all announcements
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcementss"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/get-announcements`
      );

      return data;
    },
  });

  const count = announcements.length;
  return [count];
};

export default useAnnouncementCount;
