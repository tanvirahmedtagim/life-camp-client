import React, { useContext } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaHeartbeat } from "react-icons/fa";
import { ThemeContext } from "../../provider/ThemeProvider";

const CampImpact = () => {
  const { theme } = useContext(ThemeContext);
  const { ref, inView } = useInView({ triggerOnce: false }); // Remove triggerOnce to allow re-animation

  const stats = [
    { id: 1, label: "People Served", value: 10000 },
    { id: 2, label: "Camps Organized", value: 50 },
    { id: 3, label: "Medical Volunteers", value: 500 },
  ];

  return (
    <section
      ref={ref}
      className={`${
        theme === "dark" ? "text-teal-400 bg-gray-900" : "text-teal-700"
      } py-10`}
    >
      <div className="w-full mx-auto text-center">
        <h2 className="text-3xl font-semibold flex items-center justify-center gap-2">
          <FaHeartbeat /> Our Impact
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`p-6 rounded-xl shadow-lg border border-teal-500 ${
                theme === "dark"
                  ? "border-teal-500 bg-gray-700"
                  : "border-teal-500 bg-white"
              }`}
            >
              <h3 className="text-2xl font-bold">
                <CountUp
                  start={inView ? 0 : stat.value}
                  end={inView ? stat.value : 0}
                  duration={2}
                  key={inView} // Reset animation on re-enter
                />
                +
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampImpact;
