import React, { useEffect, useState, useCallback } from "react";
import youtube from "../../APIs/YouTube_Api";
import MenuButton from "../MenuButton";
import VideoCard from "./VideoCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

const Vlogs = () => {
  const [videos, setVideos] = useState();
  const [prevPageToken, setPrevPageToken] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [focusVideo, setFocusVideo] = useState();
  const getFeed = useCallback(
    async (pageToken = "") => {
      youtube
        .get("playlistItems", {
          params: {
            playlistId: "PL12Qc3qxEnMenhTE0JYaxAlUN0XgrYWL0",
            part: "snippet, contentDetails",
            maxResults: 12,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            pageToken,
          },
        })
        .then((obj) => {
          setVideos(obj.data.items);
          setPrevPageToken(
            obj.data.prevPageToken ? obj.data.prevPageToken : ""
          );
          setNextPageToken(
            obj.data.nextPageToken ? obj.data.nextPageToken : ""
          );
          if (!focusVideo) setFocusVideo(obj.data.items[0]);
        })
        .catch((err) => console.log(err.message));
    },
    [focusVideo]
  );

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  const parseDate = (str) => {
    let date = new Date(str);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handlePageChange = (token) => {
    getFeed(token);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <MenuButton />
      <Row className="justify-content-around p-2 mb-4">
        {focusVideo ? (
          <Card className="w-100">
            <Card.Body className="p-1 p-md-3">
              <div className="embed-responsive embed-responsive-16by9 mb-3">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${focusVideo.snippet.resourceId.videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="this"
                ></iframe>
              </div>

              <Card.Title>{focusVideo.snippet.title}</Card.Title>
              <Card.Subtitle className="pb-2 font-weight-light font-italic">
                {parseDate(focusVideo.snippet.publishedAt)}
              </Card.Subtitle>
              <Card.Text>{focusVideo.snippet.description}</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <Spinner animation="border" />
        )}
      </Row>
      <Row>
        {console.log(videos)}
        {videos &&
          videos.map(
            (video) =>
              video.snippet.title !== "Deleted video" && (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                  style={{ paddingBottom: "1rem" }}
                  key={video.id}
                >
                  <VideoCard
                    setFocusVideo={setFocusVideo}
                    video={video}
                    parseDate={parseDate}
                  />
                </Col>
              )
          )}
      </Row>
      <Row className="p-3">
        <span className="mx-auto">
          <Button
            size="lg"
            disabled={!prevPageToken}
            onClick={() => handlePageChange(prevPageToken)}
            className="mr-2"
          >
            Prev
          </Button>
          <Button
            size="lg"
            disabled={!nextPageToken}
            onClick={() => handlePageChange(nextPageToken)}
          >
            Next
          </Button>
        </span>
      </Row>
    </div>
  );
};

export default Vlogs;
