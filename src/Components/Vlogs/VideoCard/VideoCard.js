import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const VideoCard = ({ video, setFocusVideo, parseDate }) => {
  const handleSetVideo = (videoToSet) => {
    setFocusVideo(videoToSet);
    window.scrollTo(0, 0);
  };
  return (
    <Card className="w-auto justify-content-between">
      <Card.Img variant="top" src={video.snippet.thumbnails.high.url} />
      <Card.Body>
        <Card.Title
          style={{
            height: "3rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "4000px",
          }}
        >
          {video.snippet.title}
        </Card.Title>
        <Card.Subtitle className="py-2 font-weight-normal font-italic">
          {parseDate(video.snippet.publishedAt)}
        </Card.Subtitle>

        <Card.Text
          style={{
            height: "6rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {video.snippet.description}
        </Card.Text>
        <Button variant="primary" onClick={() => handleSetVideo(video)}>
          Play
        </Button>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
