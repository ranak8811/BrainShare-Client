/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/axiosSecure";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  const axiosSecure = useAxiosSecure();
  const voteDifference = post.upVote - post.downVote;
  const [commentCount, setCommentCount] = useState(0);

  const getComment = async () => {
    try {
      const { data } = await axiosSecure(`/get-comments/${post._id}`);
      // console.log(data);
      const { totalComments } = data;
      setCommentCount(totalComments);
    } catch (e) {
      console.log(e);
      toast.error("Commnet fetching error: ", e.message);
    }
  };

  getComment();

  // console.log(commentCount);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      <Link to={`/details/${post._id}`}>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-12 h-12 rounded-full border-2 border-secondary"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
            <p className="text-sm text-gray-500">By {post.authorName}</p>
          </div>
        </div>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Tags:</span>
            <span className="bg-secondary text-white py-1 px-2 rounded-full">
              {post.tag}
            </span>
          </div>
          <p>Posted on {format(new Date(post.createdAt), "PPpp")}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-800 font-bold">Votes: {voteDifference}</p>
          <p className="text-gray-800 font-bold">
            Comments: {commentCount || 0}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
