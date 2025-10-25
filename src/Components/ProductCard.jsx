import React from "react";
import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { BiBarChartAlt2 } from "react-icons/bi";

/**
 * ProductCard
 * Visual spec:
 * - Top-left discount ribbon (e.g., 25%)
 * - Row of 5 stars
 * - Large product image
 * - Normal state: price and title shown at the bottom
 * - Hover state: price/title fade out and action buttons (wish, compare, cart) fade in
 */
const ProductCard = ({
  image,
  title = "RST Full Zipped Sweatshirt",
  price = 128.24,
  discount = 25,
  rating = 0,
  onAddToCart,
}) => {
  const formattedPrice =
    typeof price === "number" ? `$ ${price.toFixed(2)}` : price;

  return (
    <div className="group relative w-full max-w-[320px] bg-[#f6f6f6] border border-gray-200 rounded-md shadow-sm overflow-hidden">
      {/* Discount ribbon */}
      {discount ? (
        <div className="absolute right-0 top-0 w-0 h-0 border-t-56 border-l-56 border-t-amber-400 border-l-transparent z-10">
          <span className="absolute -left-0.5 -top-[38px] -rotate-45 text-white text-sm font-semibold select-none">
            {discount}%
          </span>
        </div>
      ) : null}

      {/* Rating */}
      <div className="flex items-center gap-1 px-5 pt-5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) =>
          i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
        )}
      </div>

      {/* Image */}
      <div className="px-5 pt-2 pb-6">
        <img
          src={image}
          alt={title}
          className="mx-auto max-h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Normal footer (price + title) */}
      <div className="px-6 pb-6 transition-all duration-200 group-hover:opacity-0 group-hover:translate-y-2">
        <div className="text-3xl font-extrabold text-[#303030]">
          {formattedPrice}
        </div>
        <div className="mt-2 text-gray-500">{title.slice(0, 30)}...</div>
      </div>

      {/* Hover actions */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex items-center justify-center gap-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
        <IconButton label="Add to cart" onClick={onAddToCart}>
          <FaShoppingCart className="text-[20px]" />
        </IconButton>
      </div>
    </div>
  );
};

const IconButton = ({ children, onClick, label }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="h-12 w-12 rounded bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all grid place-items-center hover:cursor-pointer"
  >
    {children}
  </button>
);

export default ProductCard;
