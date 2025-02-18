import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return loading ? (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-white border-b-transparent rounded-full animate-[spin_1s_linear_reverse]"></div>
      </div>
    </div>
  ) : (
    <div
      className={`min-h-screen transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-base-200 text-gray-900"
      }`}
    >
      <Navbar />
      <div className="mt-[72px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
