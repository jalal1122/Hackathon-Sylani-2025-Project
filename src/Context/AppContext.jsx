// src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize from localStorage once on first render
  const [cartItems, setCartItems] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("cartItems"));
      if (!Array.isArray(data)) return [];
      // Ensure each item has a quantity
      return data.map((item) =>
        item && typeof item.quantity === "number"
          ? item
          : { ...item, quantity: 1 }
      );
    } catch {
      return [];
    }
  });

  // Persist on any change
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch {
      /* noop */
    }
  }, [cartItems]);

  return (
    <AppContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
