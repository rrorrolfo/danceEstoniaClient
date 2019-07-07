import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './eventDetails.css';

const EventDetails = ({
  match,
  category,
  actionOnMount,
  singleEvent,
  singleFestival
}) => {
  const { style, id } = match.params;
  useEffect(() => {
    actionOnMount(`/${category}/${style}/${id}`);
  }, []);
  const selectedEvent = category === 'events' ? singleEvent : singleFestival;
  return selectedEvent ? (
    <React.Fragment>
      <Container
        fluid
        className="event-img"
        style={{
          backgroundImage: `url(http://localhost:5000/${
            selectedEvent.imageURL
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
      <Container className="event-details-container">
        <h1 className="event-title centered">{selectedEvent.name}</h1>
        <p className="event-styles">{selectedEvent.styles.join(', ')}</p>
        <p className="event-venue">{`${selectedEvent.venueOfEvent}, ${
          selectedEvent.venueAddress
        }, ${selectedEvent.cityOfEvent}, ${selectedEvent.countryOfEvent}`}</p>
        <p className="event-date">{`${selectedEvent.dateOfEvent}, ${
          selectedEvent.timeOfEvent
        }`}</p>
        <p className="event-social-links">
          {selectedEvent.website
            ? selectedEvent.website
            : selectedEvent.fbEvent}
        </p>
        <p className="event-ticke-price">{selectedEvent.ticketPrice}</p>
        <p className="event-description">{selectedEvent.description}</p>
        <p>map</p>
      </Container>
    </React.Fragment>
  ) : null;
};

EventDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  actionOnMount: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  singleEvent: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  singleFestival: PropTypes.object
};

EventDetails.defaultProps = {
  singleEvent: null,
  singleFestival: null
};

export default EventDetails;
