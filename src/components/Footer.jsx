import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="sticky mt-6 top-[100vh]">
      <footer className="bg-black text-gray-300">
        <div className="w-11/12 mx-auto text-center py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex h-12 gap-2 lg:justify-start justify-center  items-center">
              <img className="h-full" src={logo} alt="" />
              <h2 className=" lg:text-2xl mt-4 text-white font-bold mb-4">
                <span className="text-teal-500">L</span>ife
                <span className="text-teal-500">C</span>amp
              </h2>
            </div>
            <p className="mb-4 lg:text-left">
              Connecting people with expert healthcare, offering wellness
              solutions, education, and support through specialized medical
              camps tailored for every need.
            </p>
            <div className="flex lg:justify-start justify-center space-x-4">
              <Link
                to="#"
                className="text-teal-500 hover:text-teal-400 text-2xl"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="#"
                className="text-teal-500 hover:text-teal-400 text-2xl"
              >
                <FaInstagram />
              </Link>
              <Link
                to="#"
                className="text-teal-500 hover:text-teal-400 text-2xl"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                className="text-teal-500 hover:text-teal-400 text-2xl"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-teal-500 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#banner"
                  className="hover:text-teal-400 transition duration-200"
                >
                  Homepage
                </a>
              </li>
              <li>
                <a
                  href="#popularCamps"
                  className="hover:text-teal-400 transition duration-200"
                >
                  Popular Camp
                </a>
              </li>
              <li>
                <Link
                  to="/availableCamps"
                  className="hover:text-teal-400 transition duration-200"
                >
                  Available Camps
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-teal-400 transition duration-200"
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-teal-500 font-semibold mb-4">Our Doctors</h3>
            <ul className="space-y-2">
              <li>Dr. K. Alam (Pediatrician)</li>
              <li>Dr. R. Hossain (Dentist)</li>
              <li>Dr. S. Karim (Eye Specialist)</li>
              <li>Dr. A. Kabir (General Physician) </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-teal-500 font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">
              <i className="fas fa-map-marker-alt text-teal-500 mr-2"></i>
              123 Rentify St, Cityville, Country
            </p>
            <p className="mb-2">
              <i className="fas fa-phone text-teal-500 mr-2"></i>
              +123-456-7890
            </p>
            <p>
              <i className="fas fa-envelope text-teal-500 mr-2 text-center"></i>
              lifecamp@gmail.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 py-4 text-center text-sm">
          <p>© 2025 Life Camp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
