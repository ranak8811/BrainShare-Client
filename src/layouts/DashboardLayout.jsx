import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <section className="relative min-h-screen md:flex bg-white">
      <Sidebar></Sidebar>
      <div>
        <Outlet></Outlet>
      </div>
    </section>
  );
};

export default DashboardLayout;
