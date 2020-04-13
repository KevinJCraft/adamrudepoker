import React from "react";
import MenuButton from "../MenuButton";
import HeroCarousel from "../HeroCarousel";
import "./home.css";

const Home = () => {
  //const el = useLoadingEffect("fade");
  //const name = useLoadingEffect("moveleft");
  // title = useLoadingEffect("moveup");

  return (
    <>
      <MenuButton />
      <div className="home-screen">
        <div className="home-main-content">Home Screen</div>
      </div>
      <HeroCarousel />
    </>
  );
};

export default Home;
