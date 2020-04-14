import React, { useEffect, useState, useCallback } from "react";
import youtube from "../../APIs/YouTube_Api";
import MenuButton from "../MenuButton";
import VideoCard from "./VideoCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Vlogs = () => {
  const [videos, setVideos] = useState();
  const [prevPageToken, setPrevPageToken] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [focusVideoID, setFocusVideoID] = useState();
  const getFeed = useCallback(
    async (pageToken = "") => {
      youtube
        .get("playlistItems", {
          params: {
            playlistId: "PL12Qc3qxEnMenhTE0JYaxAlUN0XgrYWL0",
            part: "snippet",
            maxResults: 12,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            pageToken,
          },
        })
        .then((obj) => {
          console.log(obj);
          setVideos(obj.data.items);
          setPrevPageToken(
            obj.data.prevPageToken ? obj.data.prevPageToken : ""
          );
          setNextPageToken(
            obj.data.nextPageToken ? obj.data.nextPageToken : ""
          );
          if (!focusVideoID)
            setFocusVideoID(obj.data.items[0].snippet.resourceId.videoId);
        })
        .catch((err) => console.log(err.message));
    },
    [focusVideoID]
  );

  useEffect(() => {
    getFeed();
  }, [getFeed]);
  return (
    <div>
      <MenuButton />
      <Row style={{ justifyContent: "space-around", paddingBottom: "2rem" }}>
        <iframe
          width="100%"
          height="500px" //todo make this auto
          src={`https://www.youtube.com/embed/${focusVideoID}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="this"
        ></iframe>
      </Row>
      <Row>
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
                  <VideoCard setFocusVideoID={setFocusVideoID} video={video} />
                </Col>
              )
          )}
      </Row>
      <Row>
        <Button
          size="lg"
          disabled={!prevPageToken}
          onClick={() => getFeed(prevPageToken)}
        >
          Prev
        </Button>
        <Button
          size="lg"
          disabled={!nextPageToken}
          onClick={() => getFeed(nextPageToken)}
        >
          Next
        </Button>
      </Row>
    </div>
  );
};

export default Vlogs;
