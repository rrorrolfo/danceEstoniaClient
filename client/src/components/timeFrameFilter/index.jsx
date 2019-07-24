import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './timeFrameFilter.css';

const TimeFrameFilter = ({ fetchEvents, topLevelMatch }) => {
  return (
    <Container className="time-frame-nav-container">
      <h3>Order events by:</h3>
      <Nav variant="tabs" as="ul" className="time-frame-nav">
        <Nav.Item
          as="li"
          className="time-frame-week"
          onClick={() => {
            if (topLevelMatch.params.category) {
              return fetchEvents(
                `/events/${topLevelMatch.params.category}`,
                'week'
              );
            }
            return fetchEvents('/events', 'week');
          }}
        >
          Week
        </Nav.Item>
        <Nav.Item
          as="li"
          className="time-frame-month"
          onClick={() => {
            if (topLevelMatch.params.category) {
              return fetchEvents(
                `/events/${topLevelMatch.params.category}`,
                'month'
              );
            }
            return fetchEvents('/events', 'month');
          }}
        >
          Month
        </Nav.Item>
      </Nav>
    </Container>
  );
};

TimeFrameFilter.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  topLevelMatch: PropTypes.object.isRequired
};

export default TimeFrameFilter;
