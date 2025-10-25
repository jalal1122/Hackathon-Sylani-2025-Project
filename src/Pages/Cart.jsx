import React, { useContext, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import AppContext from "../Context/AppContext";
import heroBg from "../assets/hero3.png";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);

  const navigate = useNavigate()

  // AppContext persists changes; no need to write here

  const increment = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, quantity: (it.quantity || 1) + 1 } : it
        )
      );
    },
    [setCartItems]
  );

  const decrement = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev
          .map((it) =>
            it.id === id
              ? { ...it, quantity: Math.max(0, (it.quantity || 1) - 1) }
              : it
          )
          .filter((it) => (it.quantity || 1) > 0)
      );
    },
    [setCartItems]
  );

  const removeItem = useCallback(
    (id) => {
      setCartItems((prev) => prev.filter((it) => it.id !== id));
    },
    [setCartItems]
  );

  const subtotal = useMemo(
    () =>
      (cartItems || []).reduce(
        (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
        0
      ),
    [cartItems]
  );

  return (
    <div className="pb-16">
      {/* Hero header */}
      <div
        className="h-64 md:h-80 bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
            SHOPPING CART
          </h1>
          <div className="mt-6 inline-flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded shadow">
            <Link to="/" className="text-amber-500">
              <FaHome />
            </Link>
            <span className="text-sm">Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Cart table */}
      <div className="max-w-6xl mx-auto -mt-10 bg-white shadow p-6 rounded relative z-10">
        <div className="grid grid-cols-12 font-extrabold uppercase text-white bg-amber-400 px-4 py-3 rounded">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {/* Items */}
        <div className="divide-y">
          {(cartItems || []).length === 0 && (
            <div className="py-10 text-center text-gray-500">
              Your cart is empty.
            </div>
          )}

          {(cartItems || []).map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 items-center py-6"
            >
              {/* Product info */}
              <div className="col-span-6 flex items-center gap-4">
                <div className="h-24 w-24 bg-gray-100 rounded grid place-items-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-24 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                  <button
                    className="mt-2 hover:cursor-pointer inline-flex items-center gap-1 text-gray-500 hover:text-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    <FiX /> Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center font-semibold text-gray-900">
                $ {Number(item.price).toFixed(2)}
              </div>

              {/* Quantity controls */}
              <div className="col-span-2">
                <div className="mx-auto w-fit border rounded flex items-center overflow-hidden">
                  <button
                    className="h-10 w-10 grid place-items-center hover:bg-gray-50"
                    onClick={() => decrement(item.id)}
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>
                  <div className="h-10 w-12 grid place-items-center font-semibold">
                    {item.quantity || 1}
                  </div>
                  <button
                    className="h-10 w-10 grid place-items-center hover:bg-gray-50"
                    onClick={() => increment(item.id)}
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Line total */}
              <div className="col-span-2 text-right font-extrabold text-gray-900">
                $ {(Number(item.price) * (item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary & Checkout */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-bold text-gray-800">
            Subtotal:{" "}
            <span className="text-amber-600">$ {subtotal.toFixed(2)}</span>
          </div>

          <button onClick={() => navigate("/order-summary")} className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-3 rounded hover:cursor-pointer shadow">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
