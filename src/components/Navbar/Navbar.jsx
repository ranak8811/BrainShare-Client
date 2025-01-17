import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/brain_logo.png";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const { user, logOutUser } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/membership">Membership</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="BrainShare Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-primary">BrainShare</span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/membership">Membership</Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end space-x-4">
        <button className="btn btn-ghost relative">
          <FaBell className="text-xl text-secondary" />
          <span className="badge badge-xs badge-primary absolute top-0 right-0"></span>
        </button>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
            >
              <li className="text-center font-semibold">{user?.displayName}</li>
              <div className="divider my-1"></div>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={logOutUser}
                  className="text-error hover:text-red-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary text-background">
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
