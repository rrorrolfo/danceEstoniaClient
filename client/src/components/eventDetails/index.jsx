import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './eventDetails.css';
import mapsApiKey from '../../config/config';

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
  const formatMapSrc = () => {
    const regex = /\s/gi;
    const mapSRC = `${selectedEvent.venueOfEvent}, ${
      selectedEvent.venueAddress
    }, ${selectedEvent.cityOfEvent}, ${selectedEvent.countryOfEvent}`;
    return mapSRC.replace(regex, '+');
  };
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
        <p className="event-ticket-price">{selectedEvent.ticketPrice}</p>
        <p className="event-description">{selectedEvent.description}</p>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}
    &q=${formatMapSrc()}`}
          title="test"
          width="100%"
          height="450"
          frameBorder="0"
          allowFullScreen
        />
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
