import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import img1 from "../../assets/Community Health impact.png";
import img2 from "../../assets/Women Empowerment.png";
import img3 from "../../assets/Youth engagement.png";

const Banner = () => {
  const slides = [
    {
      image: `${img1}`,
      title: "Community Health Impact",
      description:
        "Over 2000 individuals received free health checkups and treatment.",
    },
    {
      image: `${img2}`,
      title: "Empowering Women",
      description: "Special focus on maternal and child healthcare.",
    },
    {
      image: `${img3}`,
      title: "Youth Engagement",
      description: "Encouraging youth participation in healthcare awareness.",
    },
  ];

  return (
    <div className="w-full mt-4 bg-gray-100" id="banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        className="md:h-[400px] lg:h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className=""
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center", // Centers the image
                width: "100%", // Ensures full width
                height: "100%",
              }}
            >
              {/* <div className="bg-black bg-opacity-50 text-teal-500 w-full h-full flex flex-col items-center justify-center rounded-lg text-center ">
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
