import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

const AllTags = () => {
  // fetch all tags
  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/tags`);
      return data;
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-6">
      <h2 className="text-2xl font-bold text-center">Available Tags</h2>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {tags.map((tag) => (
          <div
            key={tag._id}
            className="bg-accent text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 text-sm md:text-base"
          >
            {tag.tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTags;
