import React, { useState, useCallback, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import youtube from "../../APIs/YouTube_Api";
import SocialLinks from "../SocialLinks/SocialLinks";

const HeroSection = () => {
  const [channelData, setChannelData] = useState();

  //gets channel data for header display
  const getFeed = useCallback(async () => {
    youtube
      .get("channels", {
        params: {
          id: "UCFDd5xkTKs7BDCjvGeUl2iQ",
          part: "snippet, statistics, brandingSettings",
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
      .then((obj) => {
        setChannelData(obj.data.items[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //formats large numbers with commas
  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  return channelData ? (
    <>
      <Row className=" mx-0  position-relative ">
        <div
          className="position-absolute h-100 w-100"
          style={{
            backgroundImage: `url(${require("../../Assets/img/Banner_img.JPG")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: ".5",
            bottom: "0",
          }}
        ></div>
        <Container>
          <Row className="py-4 p-md-5">
            <Col xs={{ span: 8, offset: 2 }} md={{ span: 4, offset: 0 }}>
              <Image
                roundedCircle
                src={require("../../Assets/img/Adam_WSOP.JPG")}
                className="w-100 h-100 "
              ></Image>
            </Col>
            <Col
              className="font-weight-bold pt-3 pt-md-0 py-lg-5 d-flex flex-column justify-content-around "
              style={{ fontWeight: "10000" }}
            >
              <h1 className=" text-center text-md-left pl-md-5">Adam Rude</h1>
              <p className=" text-center text-md-left pl-md-5">
                "I play poker, and I make videos about it."
              </p>
              <Row className="m-0  pl-md-5">
                <Badge variant="info" className="d-block mx-auto mx-md-0 p-2 ">
                  subscribers:{" "}
                  {formatNumbers(channelData.statistics.subscriberCount)}
                </Badge>
                <Badge
                  variant="info"
                  className="d-block mx-auto mx-md-0 p-2 ml-md-3 "
                >
                  total views: {formatNumbers(channelData.statistics.viewCount)}
                </Badge>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
      <SocialLinks />
    </>
  ) : (
    <Spinner />
  );
};

export default HeroSection;
