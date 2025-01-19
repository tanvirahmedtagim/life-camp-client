import React from "react";
import Banner from "../../components/Home/Banner";
import PopularCamps from "../../components/Home/PopularCamps ";
import FeedBackRating from "../../components/Home/FeedBackRating";
import ServicesOffered from "../../components/Home/ServicesOffered";

const Home = () => {
  return (
    <div className="flex flex-col gap-14">
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <FeedBackRating></FeedBackRating>
      <ServicesOffered></ServicesOffered>
    </div>
  );
};

export default Home;
