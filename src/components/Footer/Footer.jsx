import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from "../../assets/brain_logo.png";

const Footer = () => {
  return (
    <footer className="bg-accent text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo & Name */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Brainshare Logo" className="w-20 mb-2" />
          <h2 className="text-2xl font-bold">Brainshare</h2>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.facebook.com/ranaf8811"
              target="blank"
              className="hover:text-primary transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/ranak8811"
              target="blank"
              className="hover:text-primary transition duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ranak8811/"
              target="blank"
              className="hover:text-primary transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/ranak8811"
              target="blank"
              className="hover:text-primary transition duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: support@brainshare.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 border-t border-gray-300 pt-4 text-sm">
        &copy; {new Date().getFullYear()} Brainshare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
