import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import { format } from "date-fns";

const MyProfile = () => {
  const { user } = useAuth();

  // fetch user details
  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/userInfo/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const { userInfo, myPosts } = userData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-8">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={userInfo.image}
          alt={userInfo.name}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 className="text-2xl font-bold text-primary">{userInfo.name}</h1>
          <p className="text-sm text-neutral">{userInfo.email}</p>
        </div>

        <div className="flex gap-4 ml-auto">
          {userInfo.badge === "bronze" && (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2894/2894962.png"
                alt="Bronze Badge"
                className="w-6 h-6"
              />
              <span>Bronze Badge</span>
            </div>
          )}
          {userInfo.badge === "gold" && (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded-md">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2894/2894963.png"
                alt="Gold Badge"
                className="w-6 h-6"
              />
              <span>Gold Badge</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-primary mb-4">My Recent Posts</h2>
        {myPosts && myPosts.length > 0 ? (
          <div className="grid gap-6">
            {myPosts.slice(0, 3).map((post) => (
              <div
                key={post._id}
                className="flex items-center gap-4 p-4 bg-gray-100 rounded-md shadow-sm"
              >
                <div className="w-20">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-16 object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-primary">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral">
                    {post.tag} •{" "}
                    {post.createdAt
                      ? format(new Date(post.createdAt), "PPpp")
                      : "Unknown Date"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral">
            You haven&apos;t created any posts yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
