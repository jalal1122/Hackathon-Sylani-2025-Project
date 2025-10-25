import { FaShoppingCart, FaHome } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useContext, useMemo } from "react";
import AppContext from "../Context/AppContext";
import { Link } from "react-router";

const Navbar = () => {
  const { cartItems } = useContext(AppContext);

  // AppContext hydrates from storage; no local init needed here

  const totalQty = useMemo(
    () => (cartItems || []).reduce((sum, it) => sum + (it?.quantity || 1), 0),
    [cartItems]
  );

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <nav className="w-full bg-black/30 flex justify-between md:justify-around items-center text-white py-3 md:py-4 px-4 md:px-0 font-bold text-base md:text-lg gap-3">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img src={logo} alt="ShopEase Logo" className="h-18" />
          </Link>
        </div>

        <ul className="flex gap-3 md:gap-5 items-center">
          <li className="flex gap-2 md:gap-3 justify-center items-center nav-Links">
            <Link to="/" className="flex gap-3 items-center">
              <FaHome size={30} color="#FEB627" style={{ cursor: "pointer" }} />
              <span>Home</span>
            </Link>
          </li>
          <li className="hidden sm:flex gap-2 md:gap-3 justify-center items-center nav-Links">
            <Link to="/checkout" className="flex gap-3 items-center">
              <span className="text-amber-400">Checkout</span>
            </Link>
          </li>
          <li className="flex gap-2 md:gap-3 justify-center items-center relative">
            <Link to="/cart" className="flex gap-3 items-center">
              <FaShoppingCart
                size={30}
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
      </nav>
    </header>
  );
};

export default Navbar;
