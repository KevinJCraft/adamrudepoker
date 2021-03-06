// to make sendgrid functional in development environement (requires API_Key)..
// 1. cd into root directory in seperate terminal
// 2. run 'source sendgrid.env'
// 3. run 'cd ./src/APIs/Email_Api'
// 4. run 'node app.js'
// 5. leave app running to send emails through app
// 6. ctrl+C to stop app

import React, { useState } from "react";
import useFormValidation from "../../Hooks/useFormValidation/useFormValidation";
import axios from "axios";
import "./contactMe.css";
import { MdSend } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const INITIAL_STATE = {
  name: "",
  email: "",
  message: "",
};

const ContactMe = () => {
  const [formCompletion, setFormCompletion] = useState({
    wasCompleted: false,
    errorMessage: "",
  });

  function sendMail() {
    axios
      .post("/.netlify/functions/sendgrid", {
        name: values.name,
        email: values.email,
        message: values.message,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFormCompletion({
            wasCompleted: true,
            errorMessage: "",
          });
          setValues(INITIAL_STATE);
          setSubmitting(false);
          setTimeout(() => {
            setFormCompletion({
              wasCompleted: false,
              errorMessage: "",
            });
          }, 5000);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        setFormCompletion({
          wasCompleted: false,
          errorMessage: "Email not sent. Server Error",
        });
        setSubmitting(false);
        setTimeout(() => {
          setFormCompletion({
            wasCompleted: false,
            errorMessage: "",
          });
        }, 5000);
      });
  }
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setValues,
    errors,
    isSubmitting,
    setSubmitting,
  } = useFormValidation(INITIAL_STATE, sendMail);

  return (
    <Form
      onSubmit={handleSubmit}
      className="mx-auto w-100  p-3 bg-secondary text-white"
    >
      <Row className="d-flex justify-content-around  text-white">
        <h3>Contact Me</h3>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name && "error"}
            />
            {errors.name && (
              <p className="error-message font-weight-bold">{errors.name}</p>
            )}
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label htmlFor="email">Email:</Form.Label>

            <Form.Control
              name="email"
              type=""
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && "error"}
            />
            {errors.email && (
              <p className="error-message font-weight-bold">{errors.email}</p>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <label htmlFor="message">Message:</label>

        <Form.Control
          name="message"
          as="textarea"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${errors.message && "error"}`}
          style={{ height: "8em" }}
        />
        {errors.message && (
          <p className="error-message font-weight-bold">{errors.message}</p>
        )}
      </Form.Group>
      <Row className="mt-5 d-flex">
        <Col className="flex-1">
          <div className="completion-message-container ">
            {formCompletion.wasCompleted && (
              <Alert variant="success" className="d-inline p-3">
                Email Sent
              </Alert>
            )}
            {formCompletion.errorMessage && (
              <Alert variant="danger" className="d-inline p-3">
                Server Error.
              </Alert>
            )}
          </div>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            variant="outline-light"
            className="px-5 align-right"
            size="lg"
            name="submit"
            style={{ "&hover": { color: "transparent", textShadow: "red" } }}
            disabled={isSubmitting}
            type="submit"
            onClick={handleSubmit}
          >
            {"  "}
            <MdSend />
            {"  "}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ContactMe;
