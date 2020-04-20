import React, { useState, useCallback, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import youtube from "../../APIs/YouTube_Api";
import { IconContext } from "react-icons";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const HeroSection = () => {
  const [channelData, setChannelData] = useState();
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

  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  return channelData ? (
    <>
      <Row className="mt-5 mx-0  position-relative ">
        <div
          className="position-absolute w-100 h-100"
          style={{
            background: `url(${channelData.brandingSettings.image.bannerTvImageUrl}) lightgrey`,
            backgroundSize: "cover",
            opacity: ".3",
          }}
          src={channelData.brandingSettings.image.bannerTvImageUrl}
        ></div>
        <Row className="py-4 p-md-5">
          <Col xs={{ span: 8, offset: 2 }} md={{ span: 4, offset: 0 }}>
            <Image
              roundedCircle
              src={channelData.snippet.thumbnails.high.url}
              className="w-100 border border-light"
            ></Image>
          </Col>
          <Col
            className="font-weight-bold pt-3 pt-md-0 py-lg-5 d-flex flex-column justify-content-around "
            style={{ fontWeight: "10000" }}
          >
            <h1 className=" text-center text-md-left pl-md-5">
              {channelData.snippet.title}
            </h1>
            <p className=" text-center text-md-left pl-md-5">
              "{channelData.snippet.description}"
            </p>
            <Row className="m-0  pl-md-5">
              <Badge
                variant="secondary"
                className="d-block mx-auto mx-md-0 p-2 "
              >
                subscribers:{" "}
                {formatNumbers(channelData.statistics.subscriberCount)}
              </Badge>
              <Badge
                variant="secondary"
                className="d-block mx-auto mx-md-0 p-2 ml-md-3 "
              >
                total views: {formatNumbers(channelData.statistics.viewCount)}
              </Badge>
            </Row>
          </Col>
        </Row>
      </Row>
      <Row className=" justify-content-around justify-content-md-end ">
        <IconContext.Provider
          value={{ color: "gunmetal", className: "global-class-name" }}
        >
          <ListGroup horizontal className="h3 mr-md-5 bg-none">
            <ListGroup.Item
              className="border-0"
              action
              href="https://twitter.com"
              target="_blank"
            >
              <FaTwitter />
            </ListGroup.Item>
            <ListGroup.Item
              className="border-0"
              action
              href="https://twitter.com"
              target="_blank"
            >
              <FaFacebook />
            </ListGroup.Item>
            <ListGroup.Item
              className="border-0"
              action
              href="https://twitter.com"
              target="_blank"
            >
              <FaInstagram />
            </ListGroup.Item>
            <ListGroup.Item
              className="border-0"
              action
              href="https://twitter.com"
              target="_blank"
            >
              <FaYoutube />
            </ListGroup.Item>
          </ListGroup>
        </IconContext.Provider>
      </Row>
    </>
  ) : (
    <Spinner />
  );
};

export default HeroSection;
