import React from "react";
import Hero from "../Components/Home/Hero";
import Products from "../Components/Home/Products";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <Products />
    </div>
  );
};

export default Home;
