import React from "react";
import NewArrivals from "./components/newArrivals/NewArrivals";
import HomeCarousel from "./components/carousel/HomeCarousel";
import OurStoryHome from "./components/ourStoryHome/OurStoryHome";
import AsSeenOn from "./components/asSeenOn/AsSeenOn";
import FairTrade from "./components/fairTrade/FairTrade";

function Home() {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <HomeCarousel />
      <div>
        <NewArrivals />
      </div>
      <div>
        <FairTrade />
      </div>
      <div>
        <OurStoryHome />
      </div>
      <div>
        <AsSeenOn />
      </div>
    </div>
  );
}

export default Home;
