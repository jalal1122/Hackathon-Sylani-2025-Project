import { Routes, Route } from "react-router";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import OrderSummary from "../Pages/OrderSummary";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/checkout" element={<OrderSummary />} />
      </Routes>
    </div>
  );
};

export default Router;
