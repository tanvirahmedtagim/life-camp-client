import React, { useContext } from "react";
import { FaUsers } from "react-icons/fa";
import { ThemeContext } from "../../provider/ThemeProvider";

const PartnerOrganizations = () => {
  const partners = ["WHO", "Red Cross", "UNICEF", "Doctors Without Borders"];
  const { theme } = useContext(ThemeContext);
  return (
    <section
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "text-gray-900"
      }`}
    >
      <div
        className={`w-full mx-auto text-center ${
          theme === "dark" ? "bg-gray-900 text-teal-500" : "text-teal-700"
        } `}
      >
        <h2 className="text-3xl font-semibold  flex items-center justify-center gap-2">
          <FaUsers /> Our Partners
        </h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="p-4  rounded-lg shadow-md border border-teal-500"
            >
              <p className="text-lg font-semibold ">{partner}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerOrganizations;
