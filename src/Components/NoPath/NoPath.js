import React from "react";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const NoPath = () => {
  const history = useHistory();
  return (
    <Container fluid>
      <Row className="d-flex justify-content-around p-5">
        <h1>Oops. Misclick?</h1>
      </Row>
      <Row className="d-flex justify-content-around p-5">
        <Button onClick={() => history.push("/")}>Back to Home</Button>
      </Row>
    </Container>
  );
};

export default NoPath;
