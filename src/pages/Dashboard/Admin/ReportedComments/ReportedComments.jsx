import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/axiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import toast from "react-hot-toast";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // fetch reported comments
  const {
    data: reportedComments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedComments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reported-comments`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/reported-comments/${id}`);
      refetch();
      toast.success(`Comment deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error(`Comment delete error: ${error.message}`);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-background text-text px-4 py-6">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Reported Comments
      </h1>

      {reportedComments.length === 0 ? (
        <p className="text-center text-secondary text-lg">
          No reported comments to display.
        </p>
      ) : (
        <div className="space-y-6">
          {reportedComments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 rounded-lg shadow-lg bg-white border border-accent hover:shadow-xl transition duration-300"
            >
              <div className="mb-2">
                <p className="font-semibold text-primary">Comment:</p>
                <p className="text-gray-600">{comment.text}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-primary">Author:</p>
                  <p className="text-gray-600">{comment.authorName}</p>
                  <p className="text-sm text-gray-500">
                    ({comment.authorEmail})
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-primary">Commenter:</p>
                  <p className="text-gray-600">{comment.commenterName}</p>
                  <p className="text-sm text-gray-500">
                    ({comment.commenterEmail})
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-primary">Feedback:</p>
                <p className="text-gray-600">{comment.feedback || "N/A"}</p>
              </div>
              <button
                onClick={() => handleDelete(comment._id)}
                className="mt-4 bg-red-400 text-white px-4 py-2 rounded-md hover:bg-secondary transition duration-300"
              >
                Delete Comment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportedComments;
