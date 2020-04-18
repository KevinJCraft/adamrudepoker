import React from "react";
import "./Footer.css";
import ContactMe from "../ContactMe";
import Container from "react-bootstrap/Container";
const Footer = () => {
  return (
    <>
      <Container>
        <ContactMe />
      </Container>
      <footer>
        <span>all rights reserved &copy;2020</span>
      </footer>
    </>
  );
};

export default Footer;
