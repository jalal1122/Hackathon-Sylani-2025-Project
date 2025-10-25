import "./ShopButton.css";

/**
 * ShopButton component
 * - Default look: off-white button with a yellow icon wedge on the left and label on the right
 * - Hover: the whole button turns yellow
 *
 * Props:
 * - label?: string (default: "SHOP NOW")
 * - onClick?: () => void
 * - href?: string (if provided, renders an <a> tag)
 * - className?: string (extra classes for outer wrapper)
 * - fullWidth?: boolean (stretch to 100% width)
 */
const ShopButton = ({
  label = "SHOP NOW",
  onClick,
  href,
  className = "",
  fullWidth = false,
}) => {
  const Component = href ? "a" : "button";

  const commonProps = {
    className: `shop-btn ${
      fullWidth ? "shop-btn--full" : ""
    } ${className}`.trim(),
    onClick,
    href,
  };

  return (
    <Component {...commonProps}>
      <span className="shop-btn__icon" aria-hidden="true">
        {/* Cart icon (inline SVG) */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 4H5a1 1 0 0 0 0 2h1.1l1.15 6.9A3 3 0 0 0 10.2 15h6.65a3 3 0 0 0 2.95-2.45l.9-4.95A1 1 0 0 0 19.7 6H8.45L8.2 4.6A2 2 0 0 0 6.22 3H5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="19" r="1.8" fill="currentColor" />
          <circle cx="17.5" cy="19" r="1.8" fill="currentColor" />
        </svg>
      </span>
      <span className="shop-btn__label">{label}</span>
    </Component>
  );
};

export default ShopButton;
