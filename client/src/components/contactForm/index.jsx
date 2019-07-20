import React, { useState } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import Footer from '../footer';
import { emailRequest } from '../../requests/requests';
import './contactForm.css';

const ContactForm = () => {
  // Name field
  const [name, updateName] = useState('');
  const [invalidName, toggleInvalidName] = useState(false);
  const [validName, toggleValidName] = useState(false);
  // Email field
  const [email, updateEmail] = useState('');
  const [invalidEmail, toggleInvalidEmail] = useState(false);
  const [validEmail, toggleValidEmail] = useState(false);
  // Message field
  const [message, updateMessage] = useState('');
  const [invalidMessage, toggleInvalidMessage] = useState(false);
  const [validMessage, toggleValidMessage] = useState(false);

  // Message sent status
  const [messageSent, toggleMessageStatus] = useState(false);
  const [messageError, toggleMessageError] = useState(false);

  const [textareaRows, updateTextarearows] = useState(1);

  /**
   * @param {string} field - name attribute value of the input that will be targeted to be performed a text validation upon.
   */
  const validateEmptyField = (
    string,
    lengthOfString = 0,
    isMessage = false
  ) => {
    if (string.length <= lengthOfString) {
      if (isMessage) {
        toggleInvalidMessage(true);
        toggleValidMessage(false);
        return false;
      }

      toggleInvalidName(true);
      toggleValidName(false);
      return false;
    }
    if (isMessage) {
      toggleInvalidMessage(false);
      toggleValidMessage(true);
      return true;
    }
    toggleInvalidName(false);
    toggleValidName(true);
    return true;
  };

  const validateEmail = userEmail => {
    const emailRegex = emailToValidate =>
      /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailToValidate);

    if (emailRegex(userEmail) === false) {
      toggleInvalidEmail(true);
      toggleValidEmail(false);
      return false;
    }
    toggleInvalidEmail(false);
    toggleValidEmail(true);
    return true;
  };

  const handleChange = (callback, newValue, fieldToValidate) => {
    callback(newValue);
    switch (fieldToValidate) {
      case 'name':
        return validateEmptyField(newValue);
      case 'email':
        return validateEmail(newValue);
      case 'message':
        return validateEmptyField(newValue, 20, true);
      default:
        return null;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Reset response messages
    toggleMessageStatus(false);
    toggleMessageError(false);
    // do validations when user clicks submit
    if (validName && validEmail && validMessage) {
      emailRequest({
        nombre: name,
        email,
        subject: 'DanceEstonia Contact',
        message
      })
        .then(response => {
          if (response === 'success') {
            toggleMessageStatus(true);
          } else {
            toggleMessageError(true);
          }
        })
        .catch(error => {
          toggleMessageError(true);
          console.log(error);
        });
    }
  };
  return (
    <React.Fragment>
      <Container className="contact-form-container full-vh-height">
        <h1 className="centered contact-title">Get in contact with us</h1>
        <Form className="contact-form" onSubmit={e => handleSubmit(e)}>
          <Form.Row className="contact-data">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label className="isHidden">Name</Form.Label>
              <Form.Control
                className="input-decoration"
                type="text"
                placeholder="Name"
                name="name"
                onChange={e => handleChange(updateName, e.target.value, 'name')}
                isInvalid={invalidName}
                isValid={validName}
              />
              <Form.Control.Feedback type="invalid">
                Please type your name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="isHidden">Email</Form.Label>
              <Form.Control
                className="input-decoration"
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={e =>
                  handleChange(updateEmail, e.target.value, 'email')
                }
                isInvalid={invalidEmail}
                isValid={validEmail}
              />
              <Form.Control.Feedback type="invalid">
                You email must have an &apos;@&apos; and a domain (e.g.
                email@example).
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label className="isHidden">Message</Form.Label>
            <Form.Control
              className="input-decoration"
              as="textarea"
              name="message"
              rows={textareaRows}
              placeholder="Message"
              onFocus={() => updateTextarearows(4)}
              onChange={e =>
                handleChange(updateMessage, e.target.value, 'message')
              }
              isInvalid={invalidMessage}
              isValid={validMessage}
            />
            <Form.Control.Feedback type="invalid">
              Your message must be at least 15 characters long.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="contact-form-submit"
          >
            Submit
          </Button>
        </Form>
        <Container className={messageSent ? 'successMessage' : 'isHidden'}>
          <h3 className="centered">Your message has been sent successfully!</h3>
          <p className="centered">
            Thanks for contacting us, we will get in touch with you as soon as
            possible.
          </p>
        </Container>
        <Container className={messageError ? 'failedMessage' : 'isHidden'}>
          <p>
            Oops! Seems that that there was an error while sending your message,
            please try again.
          </p>
        </Container>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default ContactForm;
