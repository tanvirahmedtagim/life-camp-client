import React from "react";
import Banner from "../../components/Home/Banner";
import PopularCamps from "../../components/Home/PopularCamps ";

const Home = () => {
  return (
    <div className="flex flex-col gap-20">
      <Banner></Banner>
      <PopularCamps></PopularCamps>
    </div>
  );
};

export default Home;
