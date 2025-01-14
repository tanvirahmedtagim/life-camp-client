import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-11/12 mx-auto mt-16 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
