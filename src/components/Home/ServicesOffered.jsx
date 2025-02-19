import React, { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const ServicesOffered = () => {
  const { theme } = useContext(ThemeContext);
  const services = [
    {
      title: "General Checkups",
      description:
        "Comprehensive health checkups to ensure your overall well-being.",
      icon: "🩺",
    },
    {
      title: "Eye Tests",
      description: "Free vision screening and basic eye care consultation.",
      icon: "👁️",
    },
    {
      title: "Dental Checkups",
      description:
        "Professional dental checkups to address oral health issues.",
      icon: "🦷",
    },
    {
      title: "Vaccination Drive",
      description:
        "Get vaccinated against common illnesses with certified vaccines.",
      icon: "💉",
    },
    {
      title: "Specialist Consultations",
      description:
        "Consult experienced specialists for specific health concerns.",
      icon: "👩‍⚕️",
    },
    {
      title: "Health Workshops",
      description:
        "Interactive workshops on wellness, fitness, and healthy lifestyle practices.",
      icon: "🏋️",
    },
    {
      title: "Nutrition Counseling",
      description:
        "Personalized dietary plans and guidance for a balanced lifestyle.",
      icon: "🥗",
    },
    {
      title: "Mental Health Support",
      description: "Access to counseling and resources for mental well-being.",
      icon: "🧠",
    },
  ];

  return (
    <section
      className={`mb-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : " text-gray-900"
      }`}
    >
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Services Offered</h2>
        <p className="mb-8">
          Explore the range of free and specialized medical services available
          at our camp.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              } rounded-lg shadow-md p-6 hover:shadow-lg transition`}
            >
              <div
                className={`text-5xl mb-4 ${
                  theme === "dark" ? "text-teal-400" : "text-indigo-500"
                }`}
              >
                {service.icon}
              </div>
              <h3
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                } mb-2`}
              >
                {service.title}
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : ""
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOffered;
