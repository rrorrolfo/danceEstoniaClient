import React, { useState } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import './contactForm.css';

const ContactForm = () => {
  const [textareaRows, updateTextarearows] = useState(1);
  return (
    <Container className="contact-form-container">
      <h1 className="centered contact-title">Get in contact with us</h1>
      <Form className="contact-form">
        <Form.Row className="contact-data">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="isHidden">Name</Form.Label>
            <Form.Control
              className="input-decoration"
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="isHidden">Email</Form.Label>
            <Form.Control
              className="input-decoration"
              type="email"
              placeholder="Enter your email"
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label className="isHidden">Message</Form.Label>
          <Form.Control
            className="input-decoration message-input"
            as="textarea"
            rows={textareaRows}
            placeholder="Message"
            onFocus={() => updateTextarearows(4)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="contact-form-submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ContactForm;
