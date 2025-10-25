import { FaShoppingCart, FaHome, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useContext, useMemo, useState } from "react";
import AppContext from "../Context/AppContext";
import { Link } from "react-router";

const Navbar = () => {
  const { cartItems } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // AppContext hydrates from storage; no local init needed here

  const totalQty = useMemo(
    () => (cartItems || []).reduce((sum, it) => sum + (it?.quantity || 1), 0),
    [cartItems]
  );

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <nav className="w-full bg-black/40 backdrop-blur-md flex justify-between md:justify-around items-center text-white py-2 md:py-3 px-3 md:px-0 font-bold text-sm md:text-lg gap-3">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img src={logo} alt="ShopEase Logo" className="h-12 md:h-16" />
          </Link>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-5 items-center">
          <li className="flex gap-2 justify-center items-center nav-Links">
            <Link to="/" className="flex gap-2 items-center">
              <FaHome size={26} color="#FEB627" style={{ cursor: "pointer" }} />
              <span>Home</span>
            </Link>
          </li>
          <li className="flex gap-2 justify-center items-center nav-Links">
            <Link to="/checkout" className="flex gap-2 items-center">
              <span className="text-amber-400">Checkout</span>
            </Link>
          </li>
          <li className="flex gap-2 justify-center items-center relative">
            <Link to="/cart" className="flex gap-2 items-center">
              <FaShoppingCart
                size={26}
                color="#FEB627"
                style={{ cursor: "pointer" }}
              />
              <span>Cart</span>
            </Link>
            <div className="p-2 border border-white w-5 h-5 rounded-full bg-black absolute -top-2 left-5 flex justify-center items-center">
              <span className="text-white text-xs font-bold">{totalQty}</span>
            </div>
          </li>
        </ul>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/cart" className="relative">
            <FaShoppingCart size={24} color="#FEB627" />
            <div className="p-1 border border-white w-5 h-5 rounded-full bg-black absolute -top-2 -right-2 flex justify-center items-center">
              <span className="text-white text-[10px] font-bold">
                {totalQty}
              </span>
            </div>
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-md border border-white/20 hover:bg-white/10"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-md text-white py-3 px-4 z-50">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <FaHome color="#FEB627" /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="text-amber-400">Checkout</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <FaShoppingCart color="#FEB627" /> <span>Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
