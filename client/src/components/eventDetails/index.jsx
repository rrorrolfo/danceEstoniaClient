import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { convertFromRaw } from 'draft-js';
import PropTypes from 'prop-types';
import './eventDetails.css';
import mapsApiKey from '../../config/config';
import Breadcrumbs from '../breadcrumbs';
import TextEditor from '../textEditor';
import { arrayToUpperCase, isoStringToDate } from '../../utils';
import {
  hotel,
  calendar,
  clock,
  tickets,
  website,
  coupleDancing,
  venue,
  mark,
  facebook
} from '../../assets/icons';

const EventDetails = ({
  match,
  category,
  actionOnMount,
  singleEvent,
  singleFestival,
  error,
  history,
  resetErrors,
  resetFestivalsErrors
}) => {
  const { id } = match.params;
  useEffect(() => {
    actionOnMount(`/${category}/${match.params.category}/${id}`);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error.status !== 0) {
      if (category === 'events') {
        resetErrors();
      }
      if (category === 'festivals') {
        resetFestivalsErrors();
      }
      history.push({
        pathname: '/notFound',
        state: { errorStatus: error.status }
      });
    }
    // eslint-disable-next-line
  }, [error]);

  const selectedEvent = category === 'events' ? singleEvent : singleFestival;
  const formatMapSrc = () => {
    const regex = /\s/gi;
    const mapSRC = `${selectedEvent.venueAddress}, ${
      selectedEvent.cityOfEvent
    }, ${selectedEvent.countryOfEvent}`;
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
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%'
        }}
      />
      <Breadcrumbs
        category={category}
        dancingStyle={match.params.category}
        eventName={selectedEvent.name}
      />
      <Container className="event-details-main-container">
        <h1 className="event-title centered">{selectedEvent.name}</h1>
        <Table className="event-details-table">
          <tbody>
            <tr>
              <td>{coupleDancing('event-couple')}</td>
              <td className="event-styles">
                {arrayToUpperCase(selectedEvent.styles)}
              </td>
            </tr>
            <tr>
              <td>
                {category === 'events'
                  ? venue('event-venue')
                  : hotel('event-hotel')}
              </td>
              <td className="event-venue">{`${selectedEvent.venueOfEvent}`}</td>
            </tr>
            <tr>
              <td>{mark('event-mark')}</td>
              <td>
                {`${selectedEvent.venueAddress}, ${
                  selectedEvent.cityOfEvent
                }, ${selectedEvent.countryOfEvent}`}
              </td>
            </tr>
            <tr>
              <td>{calendar('event-calendar')}</td>
              <td className="event-date">
                {isoStringToDate(selectedEvent.dateOfEvent)}
              </td>
            </tr>
            <tr>
              <td>{clock('event-clock')}</td>
              <td className="event-time">{selectedEvent.timeOfEvent}</td>
            </tr>
            {selectedEvent.fbEvent && category === 'events' ? (
              <tr>
                <td>{facebook('event-facebook')}</td>
                <td className="event-social-links">
                  <a
                    href={selectedEvent.fbEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedEvent.fbEvent}
                  </a>
                </td>
              </tr>
            ) : null}
            {selectedEvent.website ? (
              <tr>
                <td>{website('event-website')}</td>
                <td className="event-social-links">
                  <a
                    href={selectedEvent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedEvent.website}
                  </a>
                </td>
              </tr>
            ) : null}
            <tr>
              <td>{tickets('event-ticket')}</td>
              <td className="event-ticket-price">
                {selectedEvent.ticketPrice}
              </td>
            </tr>
          </tbody>
        </Table>
        <TextEditor
          isEvent
          eventDescription={convertFromRaw(
            JSON.parse(selectedEvent.description)
          )}
        />
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}
      &q=${formatMapSrc()}`}
          title={`${selectedEvent.name} map`}
          width="100%"
          height="400"
          frameBorder="0"
          allowFullScreen
          className="event-map"
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
  singleFestival: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object.isRequired,
  resetErrors: PropTypes.func,
  resetFestivalsErrors: PropTypes.func
};

EventDetails.defaultProps = {
  singleEvent: null,
  singleFestival: null,
  resetErrors: null,
  resetFestivalsErrors: null
};

export default withRouter(EventDetails);
