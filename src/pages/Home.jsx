import React, { useEffect } from "react";
import { Announcment, Footer, Categories, Newsletter, Products, Slider } from "../components";

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Announcment />
      <Slider></Slider>
      <Categories></Categories>
      <Products></Products>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </>
  );
};

export default Home;
