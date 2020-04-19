import React from "react";
import { useHistory } from "react-router-dom";
import ShopCarousel from "../ShopCarousel";
import "./home.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const Home = () => {
  const history = useHistory();

  return (
    <>
      <Jumbotron className="mb-5 ">
        <h2 className="p-3">Vlog of the week!</h2>
        <div className=" w-100 embed-responsive embed-responsive-16by9 mb-3">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/K9EYsNIr2zE`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="this"
          ></iframe>
        </div>
        <Row className="justify-content-end mx-0">
          <Button
            variant="outline-primary"
            onClick={() => history.push("/vlogs")}
          >
            View More Videos
          </Button>
        </Row>
      </Jumbotron>
      <ShopCarousel />

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
