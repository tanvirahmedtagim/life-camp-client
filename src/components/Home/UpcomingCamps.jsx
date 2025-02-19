import React, { useContext } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ThemeContext } from "../../provider/ThemeProvider";

const UpcomingCamps = () => {
  const { theme } = useContext(ThemeContext);
  const events = [
    {
      id: 1,
      name: "Free Eye Checkup Camp",
      date: "June 23, 2025",
      location: "Dhaka, Bangladesh",
    },
    {
      id: 2,
      name: "Blood Donation Drive",
      date: "January 21, 2026",
      location: "Chittagong, Bangladesh",
    },
    {
      id: 3,
      name: "Blood Donation Drive",
      date: "December 21, 2025",
      location: "Rajshahi, Bangladesh",
    },
  ];

  return (
    <section
      className={`${
        theme === "dark" ? "text-teal-400 bg-gray-900" : "text-teal-700"
      }`}
    >
      <div className=" mx-auto text-center">
        <h2 className="text-3xl font-semibold text-teal-700 flex items-center justify-center gap-2">
          <FaRegCalendarAlt /> Upcoming Camps & Events
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-6  shadow-lg rounded-xl border border-teal-500 ${
                theme === "dark"
                  ? "border-teal-500 bg-gray-700"
                  : "border-teal-500 bg-white"
              }`}
            >
              <h3 className="text-xl font-bold ">{event.name}</h3>
              <p className="">
                📅 {event.date} | 📍 {event.location}
              </p>
              <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCamps;
