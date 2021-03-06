import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./SocialLinks.css";

const SocialLinks = () => {
  return (
    <Container className="mb-5">
      <Row className=" justify-content-around justify-content-md-end ">
        <ListGroup horizontal className="h3 mr-md-5 ">
          <ListGroup.Item
            className="border-0 text-secondary"
            action
            href="https://twitter.com/pvault2"
            target="_blank"
          >
            <FaTwitter />
          </ListGroup.Item>
          <ListGroup.Item
            className="border-0 text-secondary"
            action
            href="https://www.facebook.com/groups/775964176144656/?ref=share"
            target="_blank"
          >
            <FaFacebook />
          </ListGroup.Item>
          <ListGroup.Item
            className="border-0 text-secondary"
            action
            href="https://instagram.com/adamrude2go"
            target="_blank"
          >
            <FaInstagram />
          </ListGroup.Item>
          <ListGroup.Item
            className="border-0 text-secondary"
            action
            href="https://www.youtube.com/channel/UCFDd5xkTKs7BDCjvGeUl2iQ"
            target="_blank"
          >
            <FaYoutube />
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </Container>
  );
};

export default SocialLinks;
