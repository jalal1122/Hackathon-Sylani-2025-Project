import { Link } from "react-router";
import { IoLocationSharp } from "react-icons/io5";
import { FiPhone, FiMail } from "react-icons/fi";
import logo from "../assets/logo.png";
import bgImage from "../assets/hero2.png";

const Footer = () => {
  return (
    <footer
      className="relative w-full h-fit text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Info */}
          <section>
            <h3 className="text-xl font-extrabold tracking-wide mb-6 uppercase">
              Contact Info
            </h3>
            <ul className="space-y-5 text-gray-200">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">
                  <IoLocationSharp size={20} />
                </span>
                <div>
                  <p>University Town Sylani Mass IT center</p>
                  <p>Peshawar</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">
                  <FiPhone size={18} />
                </span>
                <p>PHONE: +92-315-8670180</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">
                  <FiMail size={18} />
                </span>
                <p>EMAIL: jk4350649@gmail.com</p>
              </li>
            </ul>
          </section>

          {/* About Us */}
          <section>
            <h3 className="text-xl font-extrabold tracking-wide mb-6 uppercase">
              About Us
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <img src={logo} alt="ShopEase" className="h-20" />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Discover a smarter way to shop with curated products and a smooth,
              secure checkout. We bring quality and convenience right to your
              doorstep.
            </p>
          </section>

          {/* Quick Links */}
          <section>
            <h3 className="text-xl font-extrabold tracking-wide mb-6 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-4 text-gray-200">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-amber-400 transition-colors"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-300 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <p className="text-white/60">
            Built for Hackathon Sylani 2025 project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
