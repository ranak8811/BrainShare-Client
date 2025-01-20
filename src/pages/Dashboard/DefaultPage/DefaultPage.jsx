import { FaUser, FaPlus, FaBullhorn, FaFlag } from "react-icons/fa";
import { MdPostAdd, MdOutlineManageAccounts } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useTitle from "../../../../public/PageTitle/title";

const DefaultPage = () => {
  useTitle("Dashboard");
  const { user } = useAuth();
  const [role] = useRole();

  // Define role-specific menu items
  const userMenu = [
    { name: "My Profile", icon: <FaUser />, link: "/dashboard/my-profile" },
    { name: "Add a Post", icon: <FaPlus />, link: "/dashboard/add-post" },
    { name: "My Posts", icon: <MdPostAdd />, link: "/dashboard/my-posts" },
  ];

  const adminMenu = [
    { name: "My Profile", icon: <FaUser />, link: "/dashboard/my-profile" },
    {
      name: "Manage Users",
      icon: <MdOutlineManageAccounts />,
      link: "/dashboard/manage-users",
    },
    {
      name: "Reported Comments",
      icon: <FaFlag />,
      link: "/dashboard/reported-comments",
    },
    {
      name: "Make Announcement",
      icon: <FaBullhorn />,
      link: "/dashboard/make-announcement",
    },
  ];

  const menu = role === "admin" ? adminMenu : userMenu;

  return (
    <div className="min-h-screen bg-[#f3faf0] text-[#040903] px-4 py-8">
      {/* Greeting Section */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to your Dashboard, {user.displayName}!
        </h1>
        <p className="text-lg text-[#67cda3]">
          Your role: <span className="font-bold">{role}</span>
        </p>
      </div>

      {/* User Information */}
      <div className="mt-8 flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-4xl mx-auto">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-20 h-20 rounded-full border-4 border-[#76c550] mb-4 md:mb-0"
        />
        <div className="ml-0 md:ml-6 text-center md:text-left">
          <h2 className="text-2xl font-semibold">{user.displayName}</h2>
          <p className="text-[#67cda3]">{user.email}</p>
        </div>
      </div>

      {/* Dashboard Menu */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex items-center hover:bg-[#76c550] hover:text-white transition duration-300 cursor-pointer"
          >
            <div className="text-3xl mr-4">{item.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultPage;

// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";

// const DefaultPage = () => {
//   const { user } = useAuth();
//   const [role] = useRole();
//   return (
//     <div>
//       <div>{user.displayName}</div>
//       <div>{user.email}</div>
//       <div>
//         <img src={user.photoURL} alt="" />
//       </div>
//       <div>{role}</div>
//     </div>
//   );
// };

// export default DefaultPage;
