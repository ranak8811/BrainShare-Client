import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../components/Home/PostCard";

const Home = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/posts`);
      return data;
    },
  });
  if (isLoading) return <LoadingPage></LoadingPage>;
  return (
    <div>
      <div className="max-w-[700px] mx-auto space-y-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
