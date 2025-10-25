import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";
import AppContext from "../Context/AppContext";
import heroBg from "../assets/hero2.png";

const OrderSummary = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const subtotal = useMemo(
    () =>
      (cartItems || []).reduce((s, it) => s + it.price * (it.quantity || 1), 0),
    [cartItems]
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Number((subtotal + shipping + tax).toFixed(2));

  const placeOrder = () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      alert("Please fill in your shipping details before placing the order.");
      return;
    }
    if ((cartItems || []).length === 0) {
      alert("Your cart is empty.");
      return;
    }
    // Alert, clear cart and redirect to home per requirements
    alert("Order placed successfully!");
    setCartItems([]);
    navigate("/");
  };

  return (
    <div className="pb-16">
      {/* Hero header */}
      <div
        className="h-56 md:h-72 bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
            ORDER SUMMARY
          </h1>
          <div className="mt-6 inline-flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded shadow">
            <Link to="/" className="text-amber-500">
              <FaHome />
            </Link>
            <span className="text-sm">Order Summary</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {/* Left: Shipping form */}
        <div className="bg-white rounded shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-extrabold mb-4 text-gray-800">
            Shipping Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <Input
              label="Address"
              className="md:col-span-2"
              value={form.address}
              onChange={(v) => setForm({ ...form, address: v })}
            />
            <Input
              label="City"
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
            />
            <Input
              label="ZIP / Postal"
              value={form.zip}
              onChange={(v) => setForm({ ...form, zip: v })}
            />
          </div>
        </div>

        {/* Right: Order card */}
        <div className="bg-white rounded shadow p-6 h-fit">
          <h2 className="text-xl font-extrabold mb-4 text-gray-800">
            Your Order
          </h2>

          <div className="space-y-4 divide-y">
            {(cartItems || []).length === 0 && (
              <div className="py-6 text-gray-500">No items in cart.</div>
            )}
            {(cartItems || []).map((item) => (
              <div
                key={item.id}
                className="pt-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </div>
                </div>
                <div className="font-bold">
                  $ {(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <Row label="Subtotal" value={`$ ${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={`$ ${shipping.toFixed(2)}`} />
            <Row label="Tax (8%)" value={`$ ${tax.toFixed(2)}`} />
            <div className="border-t pt-3 mt-3" />
            <Row label="Total" value={`$ ${total.toFixed(2)}`} bold />
          </div>

          <button
            onClick={placeOrder}
            className="mt-6 w-full bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-3 hover:cursor-pointer rounded shadow"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
      {/* Modal removed in favor of alert + redirect per requirements */}
    </div>
  );
};

const Row = ({ label, value, bold }) => (
  <div className="flex items-center justify-between">
    <span
      className={`text-gray-600 ${bold ? "font-extrabold text-gray-800" : ""}`}
    >
      {label}
    </span>
    <span
      className={`text-gray-800 ${bold ? "font-extrabold" : "font-semibold"}`}
    >
      {value}
    </span>
  </div>
);

const Input = ({ label, value, onChange, type = "text", className = "" }) => (
  <label className={`block ${className}`}>
    <span className="text-sm text-gray-600">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
      placeholder={label}
    />
  </label>
);

export default OrderSummary;
