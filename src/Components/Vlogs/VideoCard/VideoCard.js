import React from "react";
import Card from "react-bootstrap/Card";
import "./VideoCard.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const VideoCard = ({ video, handleSetFocusVideo, parseDate }) => {
  return (
    <Card
      className="w-auto hover-cursor border-0 shadow-sm shadow-md-sm p-0 rounded-0"
      onClick={() => handleSetFocusVideo(video)}
    >
      <Row className="mx-0 ">
        <Col className="p-0 rounded-0" xs={4} md={12}>
          <Card.Img
            className="rounded-0"
            src={video.snippet.thumbnails.high.url}
          />
        </Col>
        <Col className="p-0" xs={8} md={12}>
          <Card.Body className="p-1 p-sm-3 p-md-3">
            <Card.Title
              style={{
                height: "3rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {video.snippet.title}
            </Card.Title>
            <Card.Subtitle className="pb-2 font-weight-light font-italic text-muted">
              {parseDate(video.contentDetails.videoPublishedAt)}
            </Card.Subtitle>

            <Card.Text
              className=" d-none d-md-block text-muted"
              style={{
                height: "6rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {video.snippet.description}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default VideoCard;
