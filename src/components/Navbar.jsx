import { useState, useContext } from "react";
import logo from "../../src/assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ThemeContext } from "../provider/ThemeProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleLogout, setLoading } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

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
            Join Us
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#008080] dark:bg-teal-700 border-gray-200 transition-all">
      <div className="w-11/12 flex flex-wrap items-center justify-between mx-auto py-1">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-16" alt="Life Camp Logo" />
          <span className="text-2xl md:block hidden mb-1 font-semibold whitespace-nowrap text-white dark:text-gray-200">
            LIFE CAMP
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative w-14 h-8 flex items-center justify-between bg-teal-300 dark:bg-teal-700 rounded-full p-1 transition-all shadow-lg"
          >
            <span className="text-teal-800 dark:text-yellow-400 text-lg">
              🌞
            </span>
            <span className="text-teal-500 dark:text-gray-100 text-lg">🌙</span>
            <div
              className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-teal-900 rounded-full shadow-md transform transition-all ${
                theme === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>

          {user && (
            <>
              <button
                type="button"
                className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-teal-700"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.photoURL}
                  alt="User"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute lg:right-16 md:right-9 right-5 mt-60 w-48 text-base list-none bg-white dark:bg-teal-700 divide-y divide-gray-100 rounded-lg shadow-xl">
                  <div className="px-4 py-3">
                    <span className="block text-lg font-medium text-[#008080] dark:text-gray-200">
                      {user?.displayName}
                    </span>
                    <span className="block text-base text-[#008080] dark:text-gray-400 truncate">
                      {user?.email}
                    </span>
                  </div>
                  <ul>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-lg text-[#008080] dark:text-gray-200 hover:bg-[#008080] dark:hover:bg-gray-700 hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-lg text-[#008080] dark:text-gray-200 hover:bg-[#008080] dark:hover:bg-teal-700 hover:text-white rounded-b-xl"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden"
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

        {/* Navigation Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 text-white dark:text-gray-200 bg-[#008080] dark:bg-teal-700">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
