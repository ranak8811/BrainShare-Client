import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/axiosSecure";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import { imageUpload } from "../../../../api/utils";
import toast from "react-hot-toast";
import Select from "react-select";
import useTitle from "../../../../../public/PageTitle/title";

const EditPost = () => {
  useTitle("Edit Post");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [selectedTag, setSelectedTag] = useState(null);

  // fetch the post details
  const { data: post = {}, isLoading: postLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/posts/${id}`);
      return data;
    },
  });

  // fetch all tags
  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tags`);
      return data;
    },
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
      });
      setSelectedTag({ value: post.tag, label: post.tag });
    }
  }, [post]);

  if (postLoading || tagsLoading) return <LoadingPage />;

  const tagsOptions = tags.map((tag) => ({
    value: tag.tag,
    label: tag.tag,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await imageUpload(file);
      setFormData({ ...formData, imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title: formData.title,
      imageUrl: formData.imageUrl,
      description: formData.description,
      tag: selectedTag?.value || "Uncategorized",
    };

    try {
      await axiosSecure.patch(`/update-post/${id}`, updatedPost);
      toast.success("Post updated successfully");
      navigate("/dashboard/myPosts");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral mb-1">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter post title"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral mb-1">
            Post Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral mb-1">
            Post Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter post description"
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral mb-1">
            Tag
          </label>
          <Select
            options={tagsOptions}
            value={selectedTag}
            onChange={setSelectedTag}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select a tag"
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full">
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
