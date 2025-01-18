import React, { useState } from "react";
import { AiOutlineBars, AiOutlinePlusCircle } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import {
  FaHome,
  FaSearch,
  FaTasks,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdEventAvailable } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAdmin from "../../../hooks/useAdmin";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [isAdmin] = useAdmin();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-[#008080] z-40 text-white flex justify-between lg:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
                className="h-10"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button z-40 text-white p-4 focus:outline-none focus:bg-[#008080]"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      <div
        className={`z-50 lg:fixed flex flex-col justify-between overflow-x-hidden lg:w-80 min-h-screen mt-16 lg:mt-0 bg-[#008080] absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  lg:translate-x-0  transition duration-200 ease-in-out`}
      >
        {/* dashboard side bar */}
        <div className="">
          <ul className="menu text-white md:text-base lg:text-lg font-medium p-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/admin-profile">
                    <BiUserCheck></BiUserCheck>
                    Organizer Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-camp">
                    <AiOutlinePlusCircle></AiOutlinePlusCircle>
                    Add A Camp
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-camps">
                    <HiOutlineClipboardList></HiOutlineClipboardList>
                    Manage Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-registered-camps">
                    <FaTasks></FaTasks>
                    Manage Registered Camps
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/analytics">
                    <FiBarChart2></FiBarChart2>
                    Analytics
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/user-profile">
                    <FaUserCircle></FaUserCircle>
                    Participant Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/registered-camps">
                    <MdEventAvailable></MdEventAvailable>
                    Registered Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payment-history">
                    <RiMoneyDollarCircleLine></RiMoneyDollarCircleLine>
                    Payment History
                  </NavLink>
                </li>
              </>
            )}
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/availableCamps">
                <FaSearch></FaSearch>
                Available Camps
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
