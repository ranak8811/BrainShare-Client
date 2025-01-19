import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const ShowAnnouncement = () => {
  const { setAnnouncementCount } = useAuth();
  const [expanded, setExpanded] = useState(false);

  // Fetch all announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/get-announcements`
      );
      return data;
    },
  });

  // Update announcement count
  setAnnouncementCount(announcements.length);

  if (isLoading) return <LoadingPage />;

  // Determine the announcements to show
  const visibleAnnouncements = expanded
    ? announcements
    : announcements.slice(0, 2);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 ">Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleAnnouncements.map((announcement) => (
          <div
            key={announcement._id}
            className="bg-base-100 text-text p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={announcement.authorImage}
                alt={announcement.authorName}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {announcement.authorName}
                </h3>
                <p className="text-sm">{announcement.title}</p>
              </div>
            </div>
            <p className="mb-3">{announcement.description}</p>
          </div>
        ))}
      </div>
      {announcements.length > 2 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition duration-300`}
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowAnnouncement;
