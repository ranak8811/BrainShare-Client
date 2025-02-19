import { useState } from "react";
import Select from "react-select";
import useAuth from "../../../../hooks/useAuth";
import { imageUpload } from "../../../../api/utils";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/axiosSecure";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import useTitle from "../../../../../public/PageTitle/title";

const AddPost = () => {
  useTitle("Add Post");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    imageUrl: null,
    title: "",
    description: "",
  });
  const [selectedTag, setSelectedTag] = useState(null);

  // fetch all tags
  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/tags`);
      return data;
    },
  });

  if (isLoading) return <LoadingPage />;

  const tagsOptions = tags.map((tag) => ({
    value: tag.tag,
    label: tag.tag,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create a new post object
    const newPost = {
      title: formData.title,
      imageUrl: formData.imageUrl,
      description: formData.description,
      tag: selectedTag?.value || "Uncategorized",
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      createdAt: new Date().toISOString(),
    };

    // console.log("Post Object:", newPost);

    try {
      // await axios.post(`${import.meta.env.VITE_API_URL}/add-post`, newPost);
      await axiosSecure.post(`/add-post`, newPost);
      toast.success(`Post added successfully`);
      navigate("/dashboard/myPosts");
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Failed to add post. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      const imageUrl = await imageUpload(file);
      // console.log(imageUrl);
      setFormData({ ...formData, imageUrl });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Add a New Post</h2>
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
            required
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
          <button type="submit" className="btn text-white btn-primary w-full">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
