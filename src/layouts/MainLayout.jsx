import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  return loading ? (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-white border-b-transparent rounded-full animate-[spin_1s_linear_reverse]"></div>
      </div>
    </div>
  ) : (
    <div className="bg-base-200 min-h-screen">
      <Navbar></Navbar>
      <div className="w-11/12 mx-auto mt-16  ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
