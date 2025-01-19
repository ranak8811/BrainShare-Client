import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/axiosSecure";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import toast from "react-hot-toast";

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // fetch user posts with pagination
  const {
    data: postsData = { posts: [], totalPages: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myPosts", user?.email, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user-posts/${user?.email}?page=${currentPage}&limit=${postsPerPage}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const { posts, totalPages } = postsData;

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/posts/${id}`);
      refetch();
      toast.success(`Post deleted successfully`);
    } catch (error) {
      console.log(error);
      toast.error(`Post delete error: ${error.message}`);
    }
  };

  // pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-bold text-primary mb-6">My Posts</h1>

      {posts.length === 0 ? (
        <p className="text-neutral">You haven&apos;t created any posts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-gray-100 rounded-md shadow-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-2 px-4 text-left">Post Title</th>
                <th className="py-2 px-4 text-left">Votes</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-t">
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">{post.upVote + post.downVote}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      onClick={() =>
                        window.open(`/dashboard/comments/${post._id}`)
                      }
                    >
                      Comment
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
