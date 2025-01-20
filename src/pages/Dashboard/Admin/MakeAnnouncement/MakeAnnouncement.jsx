import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/axiosSecure";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../../../public/PageTitle/title";

const MakeAnnouncement = () => {
  useTitle("Make announcement");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState({
    authorImage: user?.photoURL || "",
    authorName: user?.displayName || "",
    authorEmail: user?.email || "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(announcement);

    try {
      await axiosSecure.post(`/add-announcement`, announcement);
      toast.success("Announcement created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding announcement:", error);
      toast.error(
        "Failed to add announcement. Please try again.",
        error.message
      );
    }

    setAnnouncement({
      authorImage: user?.photoURL || "",
      authorName: user?.displayName || "",
      authorEmail: user?.email || "",
      title: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-background text-text px-4 py-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Make an Announcement
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-accent space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-primary font-semibold mb-1">
              Author Image
            </label>
            <input
              type="text"
              name="authorImage"
              value={announcement.authorImage}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Author image URL"
              readOnly
            />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">
              Author Name
            </label>
            <input
              type="text"
              name="authorName"
              value={announcement.authorName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Author Name"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-primary font-semibold mb-1">
            Author Email
          </label>
          <input
            type="email"
            name="authorEmail"
            value={announcement.authorEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Enter the announcement title"
            readOnly
          />
        </div>

        <div>
          <label className="block text-primary font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={announcement.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Enter the announcement title"
            required
          />
        </div>

        <div>
          <label className="block text-primary font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={announcement.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Enter the announcement description"
            rows="5"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-300"
        >
          Create Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
