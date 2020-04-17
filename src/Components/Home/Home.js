import React from "react";
import { useHistory } from "react-router-dom";
import MenuButton from "../MenuButton";
import HeroCarousel from "../ShopCarousel";
import "./home.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const Home = () => {
  const history = useHistory();
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
        <Row className="justify-content-end mx-0">
          <Button
            onClick={() => history.push("/OddsCalculator")}
            variant="outline-primary"
          >
            Go to Calculator
          </Button>
        </Row>
      </Jumbotron>
    </>
  );
};

export default Home;
