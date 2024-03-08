import React from "react";
import { Outlet } from "react-router-dom";
import CatDefault from "images/cat-404-full-2.png"
import Header from "components/user/headers/light.js";
import Footer from "components/user/footers/SimpleFiveColumn.js";

export default () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <img src={CatDefault} className="max-w-screen-lg h-auto mx-auto my-12"/> */}
    </>
  );
};
