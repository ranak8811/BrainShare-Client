import { format } from "date-fns";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const PostCard = ({ post }) => {
  const {
    _id,
    title,
    imageUrl,
    description,
    tag,
    authorName,
    authorEmail,
    authorImage,
    upVote,
    downVote,
    createdAt,
  } = post;

  const formattedDate = createdAt
    ? format(new Date(post.createdAt), "PPpp")
    : "Unknown Date";

  return (
    <div className="card bg-base-100 shadow-md rounded-md overflow-hidden border border-neutral">
      <Link to={`/details/${_id}`}>
        {/* Post Image */}
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />

        <div className="p-4">
          {/* Title and Tag */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-primary">{title}</h3>
            <span className="badge badge-outline">{tag}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral mb-4">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>

          <div className="text-sm text-neutral mb-4">
            <span className="font-bold">Post time</span> : {formattedDate}
          </div>

          {/* Author Details */}
          <div className="flex items-center mb-4">
            <img
              src={authorImage}
              alt={authorName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h4 className="text-sm font-medium">{authorName}</h4>
              <p className="text-xs text-neutral">{authorEmail}</p>
            </div>
          </div>

          {/* Upvote and Downvote */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="btn btn-sm btn-outline btn-primary">
                Upvote <span className="ml-2">{upVote}</span>
              </button>
              <button className="btn btn-sm btn-outline btn-error">
                Downvote <span className="ml-2">{downVote}</span>
              </button>
            </div>
            <button className="btn btn-sm btn-secondary">View More</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
