import React, { useContext } from "react";
import {
  FaUsers,
  FaGlobe,
  FaFirstAid,
  FaChild,
  FaUserMd,
  FaHeartbeat,
  FaAmbulance,
} from "react-icons/fa";
import { ThemeContext } from "../../provider/ThemeProvider";
import Marquee from "react-fast-marquee";

const partners = [
  {
    name: "World Health Organization",
    icon: <FaGlobe className="text-blue-500" />,
  },
  { name: "Red Cross", icon: <FaFirstAid className="text-red-500" /> },
  { name: "UNICEF", icon: <FaChild className="text-yellow-500" /> },
  {
    name: "Doctors Without Borders",
    icon: <FaUserMd className="text-green-500" />,
  },
  {
    name: "American Heart Association",
    icon: <FaHeartbeat className="text-pink-500" />,
  },
  {
    name: "International Medical Corps",
    icon: <FaAmbulance className="text-purple-500" />,
  },
];

const PartnerOrganizations = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "text-gray-900"
      }`}
    >
      <div
        className={`w-full mx-auto text-center py-10 ${
          theme === "dark" ? "text-teal-500" : "text-teal-700"
        }`}
      >
        <h2 className="text-3xl font-semibold flex items-center justify-center gap-2">
          <FaUsers className="text-teal-500" /> Our Partners
        </h2>
        <div className="mt-8">
          <Marquee speed={50} gradient={false} pauseOnHover>
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-4 mx-4 rounded-lg shadow-md border border-teal-500 
                bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
              >
                <span className="text-3xl">{partner.icon}</span>
                <p className="text-lg font-semibold">{partner.name}</p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default PartnerOrganizations;
