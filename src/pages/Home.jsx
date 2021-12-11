import React, { useEffect } from "react";
import { Announcment, Footer, Categories, Newsletter, Products, Slider } from "../components";

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Announcment />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
