import { useState } from "react";
import logo from "../../src/assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleLogout, setLoading } = useAuth();

  const handleSignOut = async () => {
    setLoading(true);
    await handleLogout().then(() => {
      navigate("/");
      setLoading(false);
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const links = (
    <>
      <li>
        <NavLink to="/" className="block py-2 px-3 rounded md:p-0">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/availableCamps"
          className="block py-2 px-3 rounded md:p-0"
        >
          Available Camps
        </NavLink>
      </li>
      {!user && (
        <li>
          <NavLink to="/login" className="block py-2 px-3 rounded md:p-0">
            Join US
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#008080] border-gray-200">
      <div className="w-11/12 flex flex-wrap items-center justify-between mx-auto py-4">
        <Link
          to="/"
          // className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            LIFE CAMP
          </span> */}
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user && (
            <>
              {" "}
              <button
                type="button"
                className="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.photoURL}
                  alt="user photo"
                />
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  className="z-20 absolute lg:right-16 md:right-9 right-5 mt-60 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-lg font-medium text-[#008080] ">
                      {user?.displayName}
                    </span>
                    <span className="block text-base text-[#008080]  truncate">
                      {user?.email}
                    </span>
                  </div>
                  <ul className="" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-lg text-[#008080] hover:bg-[#008080] hover:text-white bg-white  "
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-lg text-[#008080] hover:bg-[#008080] hover:text-white bg-white rounded-b-xl "
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-white bg-[#008080]">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
