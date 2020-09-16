import React, { useEffect, useState, useCallback, useRef } from "react";
import youtube from "../../APIs/YouTube_Api";
import VideoCard from "./VideoCard";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";

const Vlogs = () => {
  const [videos, setVideos] = useState();
  const [prevPageToken, setPrevPageToken] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [focusVideo, setFocusVideo] = useState();
  const [error, setError] = useState();
  const videoPlayer = useRef(null);
  const videoList = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const search = queryString.parse(location.search);

  // fetches video list from youtube api
  const getVideo = useCallback(
    async (id) => {
      //first check search query for video id
      if (search.video) id = search.video;

      youtube
        .get("videos", {
          params: {
            id: id,
            part: "snippet, contentDetails, status",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
          },
        })
        .then((obj) => {
          setFocusVideo({
            Id: id,
            title: obj.data.items[0].snippet.title,
            description: obj.data.items[0].snippet.description,
            publishedAt: obj.data.items[0].snippet.publishedAt,
          });
        })
        .catch((err) => setError(err));
    },
    [search.video]
  );

  // fetches video list from youtube api
  const getFeed = useCallback(
    async (pageToken = currentPage) => {
      //first check search query for page info
      if (search.pageToken) pageToken = search.pageToken;

      youtube
        .get("playlistItems", {
          params: {
            playlistId: "UUFDd5xkTKs7BDCjvGeUl2iQ",
            part: "snippet, contentDetails, status",
            maxResults: 12,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            pageToken: pageToken,
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
          if (!search.video)
            search.video = obj.data.items[0].snippet.resourceId.videoId;

          getVideo();
        })
        .catch((err) => setError(err));
    },
    [getVideo, currentPage, search.pageToken, search.video]
  );

  //formats dates to mm/dd/yyyy
  const parseDate = (str) => {
    let date = new Date(str);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handlePageChange = (token) => {
    setCurrentPage(token);
    search.pageToken = token;
    let string = queryString.stringify(search);
    history.push({
      pathname: location.url,
      search: string,
    });
    videoList.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleSetFocusVideo = (videoToSet) => {
    setFocusVideo({
      Id: videoToSet.snippet.resourceId.videoId,
      title: videoToSet.snippet.title,
      description: videoToSet.snippet.description,
      publishedAt: videoToSet.snippet.publishedAt,
    });
    search.video = videoToSet.snippet.resourceId.videoId;
    let string = queryString.stringify(search);
    history.push({
      pathname: location.url,
      search: string,
    });

    videoPlayer.current &&
      videoPlayer.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    getFeed();
  }, [getFeed]);
  return (
    <Container>
      <Row className="justify-content-around mb-4">
        {error && <h1>{error.message}</h1>}
        {focusVideo ? (
          <Card ref={videoPlayer} className="border-0 rounded-0 shadow w-100">
            <Card.Body className="p-0">
              <div className="embed-responsive embed-responsive-16by9 mb-3">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${focusVideo.Id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="this"
                ></iframe>
              </div>
              <div className="p-2 p-md-3">
                <Card.Title>{focusVideo.title}</Card.Title>
                <Card.Subtitle className="pb-2 font-weight-light font-italic">
                  {parseDate(focusVideo.publishedAt)}
                </Card.Subtitle>
                <Card.Text>{focusVideo.description}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Spinner animation="border" />
        )}
      </Row>
      <Row ref={videoList} className="pt-4">
        {videos &&
          videos.map(
            (video) =>
              video.snippet.title !== "Deleted video" && (
                <Col
                  className="mb-3  px-0 pt-2 px-md-3 "
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                  key={video.id}
                >
                  <VideoCard
                    handleSetFocusVideo={handleSetFocusVideo}
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
    </Container>
  );
};

export default Vlogs;
