import React from "react";
import MenuButton from "../MenuButton";
import HeroCarousel from "../HeroCarousel";
import "./home.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

const Home = () => {
  //const el = useLoadingEffect("fade");
  //const name = useLoadingEffect("moveleft");
  // title = useLoadingEffect("moveup");

  return (
    <>
      <MenuButton />
      <HeroCarousel />
      <Jumbotron className="mt-3">
        <h1>"I'm No Mathematician"</h1>
        <p>
          ...and neither are you, dummy. Now, check out my Hold'em odds
          calculator and show your dummy friend that he was behind the whole
          way!
        </p>
        <p>
          <Button variant="outline-primary">Go to Calculator</Button>
        </p>
      </Jumbotron>
    </>
  );
};

export default Home;
