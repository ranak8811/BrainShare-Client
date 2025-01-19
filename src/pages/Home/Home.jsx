import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../components/Home/PostCard";
import { useState, useEffect } from "react";
import AllTags from "../../components/Home/AllTags";
import ShowAnnouncement from "../../components/Home/ShowAnnouncement";
import useAnnouncementCount from "../../hooks/useAnnouncementCount";

const Home = () => {
  const [count] = useAnnouncementCount();
  const [search, setSearch] = useState("");
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // fetch posts data
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", search, sortByPopularity],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/posts?searchParams=${search}&sortByPopularity=${sortByPopularity}`
      );
      return data;
    },
  });

  // pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    refetch();
  }, [refetch, search, sortByPopularity]);

  if (isLoading) return <LoadingPage />;

  const handleSearch = (e) => {
    e.preventDefault();

    const text = e.target.search.value;
    setSearch(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-6 py-8">
      <div className="bg-primary text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          Discover Amazing Posts
        </h1>

        <div className="text-center">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <input
              type="text"
              name="search"
              placeholder="Search posts by tags..."
              className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            />

            <button className="btn bg-white mt-3">Search</button>
          </form>
        </div>
      </div>

      <div>
        <AllTags></AllTags>
      </div>

      {count && (
        <div>
          <ShowAnnouncement></ShowAnnouncement>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            setSortByPopularity(!sortByPopularity);
            setCurrentPage(1);
          }}
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary-dark transition"
        >
          {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
        </button>

        <div className="flex items-center gap-2">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number + 1)}
              className={`py-1 px-3 rounded-md ${
                currentPage === number + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid max-w-[700px] mx-auto gap-6">
        {currentPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No posts found.</p>
      )}
    </div>
  );
};

export default Home;
