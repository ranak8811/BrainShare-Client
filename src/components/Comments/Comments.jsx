import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

const Comments = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const [selectedComment, setSelectedComment] = useState(null);
  const [modalContent, setModalContent] = useState("");

  // fetch comments with pagination
  const {
    data: commentsData = { comments: [], totalPages: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", id, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/get-comments/${id}?page=${currentPage}&limit=${commentsPerPage}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  const { comments, totalPages } = commentsData;
  // console.log(commentsData);

  const handleFeedbackChange = (comment, feedback) => {
    setSelectedComment({ ...comment, feedback });
  };

  // handle reporting a comment
  const handleReport = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/report-comment/${selectedComment._id}`,
        { feedback: selectedComment?.feedback }
      );
      refetch();
      toast.success("Comment reported successfully!");
      setSelectedComment(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to report the comment.");
    }
  };

  // pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-bold text-primary mb-3">Comments</h1>

      <h3 className="mb-3">
        {" "}
        <span className="font-bold text-accent">Post Title: </span>
        {comments[0]?.postTitle ||
          "Title is not set for this comments collection"}
      </h3>

      {comments.length === 0 ? (
        <p className="text-neutral">No comments available for this post.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-gray-100 rounded-md shadow-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Comment</th>
                <th className="py-2 px-4 text-left">Feedback</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id} className="border-t">
                  <td className="py-2 px-4">{comment?.authorEmail}</td>
                  <td className="py-2 px-4">
                    {comment.text.length > 20 ? (
                      <>
                        {comment?.text.substring(0, 20)}...
                        <button
                          className="text-blue-500 underline ml-2"
                          onClick={() => setModalContent(comment.text)}
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      comment?.text
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <select
                      className="border rounded-md p-2"
                      onChange={(e) =>
                        handleFeedbackChange(comment, e.target.value)
                      }
                      disabled={comment?.reported}
                      defaultValue={comment?.feedback || "Select feedback"}
                    >
                      <option disabled>Select feedback</option>
                      <option value="Irrelevant">Irrelevant</option>
                      <option value="Hate speech">Hate speech</option>
                      <option value="Threats">Threats</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className={`${
                        selectedComment &&
                        selectedComment._id === comment._id &&
                        selectedComment?.feedback
                          ? "bg-red-500"
                          : "bg-gray-300 cursor-not-allowed"
                      } text-white px-4 py-2 rounded-md`}
                      disabled={
                        !(
                          selectedComment &&
                          selectedComment._id === comment._id &&
                          selectedComment?.feedback
                        )
                      }
                      onClick={handleReport}
                    >
                      {comment?.reported ? "Reported" : "Report"}
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

      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <p>{modalContent}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setModalContent("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
