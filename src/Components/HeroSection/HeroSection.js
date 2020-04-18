import React, { useState, useCallback, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import youtube from "../../APIs/YouTube_Api";

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

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  return channelData ? (
    <Row className=" m-0 position-relative ">
      <div
        className="position-absolute w-100 h-100"
        style={{
          background: `url(${channelData.brandingSettings.image.bannerTvImageUrl}) lightgrey`,
          backgroundSize: "cover",
          opacity: ".3",
        }}
        src={channelData.brandingSettings.image.bannerTvImageUrl}
      ></div>
      {console.log(channelData)}
      <Row className="p-5">
        <Col xs={{ span: 8, offset: 2 }} md={4}>
          <Image
            roundedCircle
            src={channelData.snippet.thumbnails.high.url}
            className="w-100 border border-light"
          ></Image>
        </Col>
        <Col
          className="font-weight-bold pt-5 pt-md-0 py-lg-5 d-flex flex-column justify-content-around "
          style={{ fontWeight: "10000" }}
        >
          <h1 className=" text-center text-md-left pl-md-5">
            {channelData.snippet.title}
          </h1>
          <p className=" text-center text-md-left pl-md-5">
            "{channelData.snippet.description}"
          </p>
          <Row className="m-0  pl-md-5">
            <Badge variant="secondary" className="d-block mx-auto mx-md-0 p-2 ">
              subscribers: {channelData.statistics.subscriberCount}
            </Badge>
            <Badge
              variant="secondary"
              className="d-block mx-auto mx-md-0 p-2 ml-md-3 "
            >
              total views: {channelData.statistics.viewCount}
            </Badge>
          </Row>
        </Col>
      </Row>
    </Row>
  ) : (
    <Spinner />
  );
};

export default HeroSection;
