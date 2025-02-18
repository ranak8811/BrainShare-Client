import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <nav className=" sticky top-0 z-10 bg-opacity-50 backdrop-blur-3xl">
        <Navbar></Navbar>
      </nav>
      <section>
        <Outlet></Outlet>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
