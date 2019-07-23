import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import './timeFrameFilter.css';

const TimeFrameFilter = () => {
  return (
    <Container className="time-frame-nav-container">
      <h3>Order events by:</h3>
      <Nav variant="tabs" as="ul" className="time-frame-nav">
        <Nav.Item as="li" className="time-frame-week">
          Week
        </Nav.Item>
        <Nav.Item as="li" className="time-frame-month">
          Month
        </Nav.Item>
      </Nav>
    </Container>
  );
};

export default TimeFrameFilter;
