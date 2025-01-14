import React from "react";
import Banner from "../../components/Home/Banner";
import PopularCamps from "../../components/Home/PopularCamps ";
import FeedBackRating from "../../components/Home/FeedBackRating";

const Home = () => {
  return (
    <div className="flex flex-col gap-14">
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <FeedBackRating></FeedBackRating>
    </div>
  );
};

export default Home;
