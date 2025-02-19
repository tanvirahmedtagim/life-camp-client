import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ThemeContext } from "../../provider/ThemeProvider";
import { motion } from "framer-motion";

// Helper function for rendering stars
const renderStars = (rating) => {
  const fullStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return fullStars + emptyStars;
};

export default function FeedBackRating() {
  const { theme } = useContext(ThemeContext);
  const axiosPublic = useAxiosPublic();
  const {
    data: testimonials = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home-feedback");
      return res.data;
    },
  });

  // State to track scroll position
  const [scrollingUp, setScrollingUp] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // Handle scroll direction change
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingUp(false);
      } else {
        setScrollingUp(true);
      }
      lastScrollY = window.scrollY;

      // Check if the testimonial section is in view
      const section = document.getElementById("testimonial");
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      if (sectionTop < window.innerHeight && sectionBottom > 0) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : " text-gray-900"
      }`}
      id="testimonial"
    >
      <div className="main gap-4 flex flex-col justify-center">
        <div className="head-p text-charcoal uppercase text-center font-bold text-3xl mb-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            What Our Customers Say
          </motion.h1>
        </div>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper w-full"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              } border-2 rounded-lg text-center font-mono p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-2`}
            >
              <motion.div
                className="testimonials-profile-circle flex justify-center items-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : -20,
                }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={testimonial.image}
                  alt="testimonial-avatar"
                  className="testimonial-avatar w-24 h-24 border-4 border-teal-500 rounded-full"
                />
              </motion.div>
              <motion.p
                className="mt-4 "
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {testimonial.description.length > 50
                  ? `${testimonial.description.slice(0, 50)}...`
                  : testimonial.description}
              </motion.p>
              <motion.div
                className="rating mt-1 text-xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="text-teal-500">
                  {renderStars(testimonial.rating)}
                </span>
              </motion.div>
              <motion.h6
                className="review-by text-charcoal text-lg mt-1"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                - {testimonial.name}
              </motion.h6>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
