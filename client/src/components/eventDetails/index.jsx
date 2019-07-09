import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import './eventDetails.css';
import mapsApiKey from '../../config/config';

const EventDetails = ({
  match,
  category,
  actionOnMount,
  singleEvent,
  singleFestival,
  google
}) => {
  const { style, id } = match.params;
  useEffect(() => {
    actionOnMount(`/${category}/${style}/${id}`);
  }, []);
  const selectedEvent = category === 'events' ? singleEvent : singleFestival;
  const mapStyles = {
    height: '400px'
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
        <Map google={google} zoom={8} style={mapStyles} className="map" />
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

export default GoogleApiWrapper({ apiKey: mapsApiKey })(EventDetails);
