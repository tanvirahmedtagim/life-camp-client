import React from "react";
import Banner from "../../components/Home/Banner";
import PopularCamps from "../../components/Home/PopularCamps ";
import FeedBackRating from "../../components/Home/FeedBackRating";
import ServicesOffered from "../../components/Home/ServicesOffered";
import UpcomingCamps from "../../components/Home/UpcomingCamps";
import CampImpact from "../../components/Home/CampImpact";
import PartnerOrganizations from "../../components/Home/PartnerOrganizations";
import HealthTips from "../../components/Home/HealthTips";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="flex flex-col gap-14 w-11/12 mx-auto">
        <PopularCamps></PopularCamps>
        <UpcomingCamps></UpcomingCamps>
        <CampImpact></CampImpact>
        <FeedBackRating></FeedBackRating>
        <PartnerOrganizations></PartnerOrganizations>
        <HealthTips></HealthTips>
        <ServicesOffered></ServicesOffered>
      </div>
    </>
  );
};

export default Home;
