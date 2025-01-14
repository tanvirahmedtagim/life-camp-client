import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Banner = () => {
  const slides = [
    {
      image: "/images/success1.jpg",
      title: "Community Health Impact",
      description:
        "Over 2000 individuals received free health checkups and treatment.",
    },
    {
      image: "/images/success2.jpg",
      title: "Empowering Women",
      description: "Special focus on maternal and child healthcare.",
    },
    {
      image: "/images/success3.jpg",
      title: "Youth Engagement",
      description: "Encouraging youth participation in healthcare awareness.",
    },
  ];

  return (
    <div className="w-full bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="md:h-[400px] lg:h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black bg-opacity-50 text-white p-8 rounded-lg text-center max-w-xl">
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
