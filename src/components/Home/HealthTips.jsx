import React, { useContext } from "react";
import { FaHeartbeat, FaAppleAlt, FaRunning, FaTint } from "react-icons/fa";
import { ThemeContext } from "../../provider/ThemeProvider";

const HealthTips = () => {
  const { theme } = useContext(ThemeContext);
  const tips = [
    {
      id: 1,
      icon: <FaHeartbeat />,
      text: "Regular check-ups can prevent health issues.",
    },
    {
      id: 2,
      icon: <FaAppleAlt />,
      text: "Eat a balanced diet rich in vitamins and nutrients.",
    },
    {
      id: 3,
      icon: <FaRunning />,
      text: "Exercise regularly to maintain overall fitness.",
    },
    {
      id: 4,
      icon: <FaTint />,
      text: "Drink at least 8 glasses of water daily to stay hydrated.",
    },
  ];

  return (
    <section
      className={` ${
        theme === "dark" ? "bg-gray-900 text-white" : " text-gray-900"
      }`}
    >
      <div className="container mx-auto text-center">
        <h2
          className={`text-3xl font-semibold ${
            theme === "dark" ? "text-teal-400" : "text-teal-700"
          }`}
        >
          Stay Healthy with These Tips
        </h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`p-6 rounded-xl shadow-lg border ${
                theme === "dark"
                  ? "border-teal-500 bg-gray-700"
                  : "border-teal-500 bg-white"
              }`}
            >
              <div className="text-4xl text-teal-500 flex justify-center">
                {tip.icon}
              </div>
              <p className="mt-4 text-lg font-semibold">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
