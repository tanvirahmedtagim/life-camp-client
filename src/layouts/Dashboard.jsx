import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaTasks,
  FaUserCircle,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdEventAvailable } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="lg:w-80 min-h-screen bg-[#008080]">
        <ul className="menu text-white md:text-base lg:text-lg font-medium p-4">
          {/* {isAdmin ? ( */}
          <>
            <li>
              <NavLink to="/dashboard/adminHome">
                <BiUserCheck></BiUserCheck>
                Organizer Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addItems">
                <AiOutlinePlusCircle></AiOutlinePlusCircle>
                Add A Camp
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manageItems">
                <HiOutlineClipboardList></HiOutlineClipboardList>
                Manage Camps
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/bookings">
                <FaTasks></FaTasks>
                Manage Registered Camps
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/users">
                <FaUsers></FaUsers>
                All Users
              </NavLink>
            </li>
          </>
          {/* ) : ( */}
          <>
            <li>
              <NavLink to="/dashboard/userHome">
                <FiBarChart2></FiBarChart2>
                Analytics
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/history">
                <FaUserCircle></FaUserCircle>
                Participant Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/cart">
                <MdEventAvailable></MdEventAvailable>
                Registered Camps
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/review">
                <RiMoneyDollarCircleLine></RiMoneyDollarCircleLine>
                Payment History
              </NavLink>
            </li>
          </>
          {/* )} */}
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
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
