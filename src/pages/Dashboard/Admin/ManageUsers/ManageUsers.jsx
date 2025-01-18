import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/axiosSecure";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import Pagination from "./Pagination";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");

  // fetch all users with pagination and search
  const {
    data: usersData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/allUsers?page=${currentPage}&search=${searchQuery}`
      );
      return data;
    },
  });

  const users = usersData.users || [];
  const totalUsers = usersData.total || 0;

  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/make-admin/${userId}`);
      refetch();
    } catch (error) {
      console.error("Error making user admin:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
        <button className="btn ml-3">Search</button>
      </form>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Subscription Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.badge || "N/A"}</td>
                <td className="p-2 border">
                  {user.role === "admin" ? (
                    <span className="text-green-500 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalUsers}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ManageUsers;
