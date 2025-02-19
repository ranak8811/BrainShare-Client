import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/axiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaFileAlt, FaCommentDots } from "react-icons/fa";
import toast from "react-hot-toast";
import useTitle from "../../../../../public/PageTitle/title";

const COLORS = ["#76c550", "#90dbaf", "#67cda3"];

const AdminProfile = () => {
  useTitle("Admin Profile");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tag, setTag] = useState("");

  const { data: adminData = {}, isLoading } = useQuery({
    queryKey: ["adminData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin-info/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const { adminInfo, postsCount, commentsCount, usersCount } = adminData;

  // pie chart data
  const chartData = [
    { name: "Posts", value: postsCount },
    { name: "Comments", value: commentsCount },
    { name: "Users", value: usersCount },
  ];

  const handleAddTag = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post(`/tags`, { tag });
      toast.success("Tag added successfully!");
    } catch (error) {
      console.error("Error adding tag:", error);
      toast.error("Failed to add tag. Please try again.", error.message);
    }
    setTag("");
  };

  return (
    <div className="min-h-screen bg-background text-text px-6 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto border border-accent">
        <div className="flex items-center justify-center gap-6">
          <img
            src={adminInfo.image}
            alt="Admin"
            className="w-20 h-20 rounded-full border-4 border-accent"
          />
          <div>
            <h2 className="text-2xl font-bold text-primary">
              {adminInfo.name}
            </h2>
            <p className="text-secondary">{adminInfo.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div>
            <FaFileAlt className="text-primary text-3xl mx-auto mb-2" />
            <h3 className="text-xl font-semibold">{postsCount}</h3>
            <p className="text-secondary">Posts</p>
          </div>
          <div>
            <FaCommentDots className="text-primary text-3xl mx-auto mb-2" />
            <h3 className="text-xl font-semibold">{commentsCount}</h3>
            <p className="text-secondary">Comments</p>
          </div>
          <div>
            <FaUsers className="text-primary text-3xl mx-auto mb-2" />
            <h3 className="text-xl font-semibold">{usersCount}</h3>
            <p className="text-secondary">Users</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6 border border-accent">
        <h3 className="text-xl font-bold text-primary text-center mb-4">
          Site Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#76c550"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6 border border-accent">
        <h3 className="text-xl font-bold text-primary mb-4 text-center">
          Add a Tag
        </h3>
        <form onSubmit={handleAddTag} className="space-y-4">
          <div>
            <label className="block text-primary font-semibold mb-2">
              Tag Name
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Enter tag name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-300"
          >
            Add Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
