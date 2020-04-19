import React, { useState, useCallback, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router";
import youtube from "../../../APIs/YouTube_Api";

const VlogOfTheWeek = () => {
  const [videoId, setVideoId] = useState();
  const history = useHistory();
  const getVideoId = useCallback(async () => {
    youtube
      .get("playlistItems", {
        params: {
          playlistId: "UUFDd5xkTKs7BDCjvGeUl2iQ",
          part: "contentDetails",
          maxResults: 1,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
      .then((obj) => {
        console.log(obj);
        setVideoId(obj.data.items[0].contentDetails.videoId);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getVideoId();
  }, [getVideoId]);

  return videoId ? (
    <Jumbotron className="mb-5 ">
      <h2 className="p-3">Vlog of the week!</h2>
      <div className=" w-100 embed-responsive embed-responsive-16by9 mb-3">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
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
  ) : (
    <Spinner />
  );
};

export default VlogOfTheWeek;
