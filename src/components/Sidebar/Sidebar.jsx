import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/brain_logo.png";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Sidebar = () => {
  const { user, logOutUser } = useAuth();
  const [role] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex lg:min-h-screen">
      <div
        className={`fixed lg:static z-20 bg-base-100 shadow-md transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 h-full`}
      >
        <div>
          <Link to={"/"} className="p-4 flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold text-primary">BrainShare</h1>
          </Link>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {role === "user" && (
              <li>
                <Link
                  to="/dashboard/myProfile"
                  className="block px-4 py-2 text-neutral hover:bg-primary hover:text-base-100 rounded-md"
                >
                  My Profile
                </Link>
              </li>
            )}

            {role === "user" && (
              <li>
                <Link
                  to="/dashboard/addPost"
                  className="block px-4 py-2 text-neutral hover:bg-primary hover:text-base-100 rounded-md"
                >
                  Add Post
                </Link>
              </li>
            )}

            {role === "user" && (
              <li>
                <Link
                  to="/dashboard/myPosts"
                  className="block px-4 py-2 text-neutral hover:bg-primary hover:text-base-100 rounded-md"
                >
                  My Posts
                </Link>
              </li>
            )}

            {role === "admin" && (
              <li>
                <Link
                  to="/dashboard/admin/profile"
                  className="block px-4 py-2 text-neutral hover:bg-primary hover:text-base-100 rounded-md"
                >
                  My Profile
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link
                  to="/dashboard/admin/manageUsers"
                  className="block px-4 py-2 text-neutral hover:bg-primary hover:text-base-100 rounded-md"
                >
                  Manage Users
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link
                  to="/dashboard/admin/reportedComments"
                  className="block px-4 py-2 text-neutral hover:bg-primary hover:text-base-100 rounded-md"
                >
                  Reported Comments
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link
                  to="/dashboard/admin/makeAnnouncement"
                  className="block px-4 py-2 text-neutral hover:bg-primary hover:text-base-100 rounded-md"
                >
                  Make Announcement
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="absolute bottom-4 w-full px-4">
          <div className="border-t border-neutral py-4">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-neutral">
                  {user?.displayName}
                </p>
              </div>
            </div>
            <button
              onClick={logOutUser}
              className="btn btn-error text-white btn-sm mt-4 w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:ml-64">
        <div className="bg-base-100 shadow-md px-4 py-3 flex justify-between items-center lg:hidden">
          <h2 className="text-xl font-bold text-primary">BrainShare</h2>
          <button onClick={toggleSidebar} className="btn btn-ghost btn-square">
            <FaBars size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
