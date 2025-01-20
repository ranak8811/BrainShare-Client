import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";
import toast from "react-hot-toast";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import useTitle from "../../../public/PageTitle/title";

const PostDetails = () => {
  useTitle("Post Details");
  const { id } = useParams();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const shareUrl = `${window.location.origin}/post/${id}`;

  // fetch post details
  const {
    data: post = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error("You need to log in to comment.");
      return;
    }

    const newComment = {
      postId: id,
      authorName: user.displayName,
      authorEmail: user.email,
      text: comment,
      reported: false,
      feedback: "give your feedback",
      commenterEmail: user?.email,
      commenterName: user?.displayName,
      postTitle: post?.title,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add-comment`,
        newComment
      );
      setComments([...comments, newComment]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleUpVote = async () => {
    if (!user) {
      alert("You need to log in to vote.");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/upVote/${id}`,
        {
          upVote: post.upVote + 1,
        }
      );
      refetch();
      console.log("upVote: ", data);
      toast.success(`Your vote has been added successfully`);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };
  const handleDownVote = async () => {
    if (!user) {
      alert("You need to log in to vote.");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/downVote/${id}`,
        {
          downVote: post.downVote + 1,
        }
      );
      refetch();
      console.log("downVote: ", data);
      toast.success(`Your vote has been added successfully`);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const formattedDate = post.createdAt
    ? format(new Date(post.createdAt), "PPpp")
    : "Unknown Date";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-8">
      <div className="flex items-center gap-4">
        <img
          src={post.authorImage}
          alt={post.authorName}
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <h3 className="font-bold text-primary">{post.authorName}</h3>
          <p className="text-sm text-neutral">{formattedDate}</p>
        </div>
      </div>

      <div className="mt-6">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-bold text-primary mb-2">{post.title}</h1>
        <p className="text-neutral mb-4">{post.description}</p>
        <span className="px-4 py-1 bg-secondary text-white rounded-full text-sm">
          {post.tag}
        </span>
      </div>

      <div className="flex items-center gap-6 mt-6">
        <button
          onClick={() => handleUpVote()}
          className="flex items-center gap-2 text-primary hover:text-secondary"
        >
          <FaThumbsUp /> {post.upVote}
        </button>
        <button
          onClick={() => handleDownVote()}
          className="flex items-center gap-2 text-primary hover:text-secondary"
        >
          <FaThumbsDown /> {post.downVote}
        </button>
        <div className="flex items-center gap-2">
          <FacebookShareButton url={shareUrl} quote={post.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl} title={post.title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-primary mb-4">Comments</h2>
        {user ? (
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered w-full"
            />
            <button onClick={handleCommentSubmit} className="btn btn-primary">
              Comment
            </button>
          </div>
        ) : (
          <p className="text-sm text-neutral">You need to log in to comment.</p>
        )}

        <div className="space-y-4">
          {comments.map((c, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-md">
              <h4 className="font-bold">{c.authorName}</h4>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
