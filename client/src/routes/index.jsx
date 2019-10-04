/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventsRoutes from './EventsRoutes';
import FestivalsRoutes from './FestivalsRoutes';
import ContactForm from '../components/contactForm';
import CreateEvent from '../components/createForm';
import AllEventsManager from '../components/allEvents';
import AuthInterface from '../components/authorizeInterface';
import DeleteInterface from '../components/deleteInterface';
import NotFound from '../components/notFound';

const AppRoutes = ({
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleEvent,
  fetchSingleFestival,
  singleEvent,
  singleFestival,
  eventError,
  festivalError,
  resetErrors,
  resetFestivalsErrors,
  toggleLoader,
  toggleModal,
  updateLoaderText,
  translatedText
}) => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/events" />} />
      <Route
        path="/events"
        render={() => (
          <EventsRoutes
            fetchEvents={fetchEvents}
            fetchEventsByStyle={fetchEventsByStyle}
            fetchFestivals={fetchFestivals}
            fetchSingleEvent={fetchSingleEvent}
            singleEvent={singleEvent}
            eventError={eventError}
            resetErrors={resetErrors}
            toggleLoader={toggleLoader}
            updateLoaderText={updateLoaderText}
            translatedText={translatedText}
          />
        )}
      />
      <Route
        path="/festivals"
        render={() => (
          <FestivalsRoutes
            fetchEvents={fetchEvents}
            fetchFestivals={fetchFestivals}
            fetchFestivalsByStyle={fetchFestivalsByStyle}
            fetchSingleFestival={fetchSingleFestival}
            singleFestival={singleFestival}
            festivalError={festivalError}
            resetFestivalsErrors={resetFestivalsErrors}
            toggleLoader={toggleLoader}
            updateLoaderText={updateLoaderText}
            translatedText={translatedText}
          />
        )}
      />
      <Route path="/createEvent" component={CreateEvent} />
      <Route
        path="/contact"
        render={() => <ContactForm translatedText={translatedText} />}
      />
      <Route
        path="/admin/allEvents"
        render={({ match }) => (
          <AllEventsManager
            isAdmin
            match={match}
            toggleLoader={toggleLoader}
            updateLoaderText={updateLoaderText}
            translatedText={translatedText}
          />
        )}
      />
      <Route
        path="/admin/createEvent"
        render={() => (
          <CreateEvent isUser={false} isAdmin translatedText={translatedText} />
        )}
      />
      <Route
        path="/admin/authorizeEvents"
        render={() => (
          <AuthInterface isAdmin canAuth translatedText={translatedText} />
        )}
      />
      <Route
        path="/admin/editEvent/:category/:style/:id"
        render={({ match }) => (
          <CreateEvent
            isAdmin
            isEdit
            isUser={false}
            match={match}
            fetchSingleEvent={fetchSingleEvent}
            singleEvent={singleEvent}
            fetchSingleFestival={fetchSingleFestival}
            singleFestival={singleFestival}
            translatedText={translatedText}
          />
        )}
      />
      <Route
        path="/admin/deleteEvents"
        render={() => (
          <DeleteInterface
            toggleModal={toggleModal}
            isAdmin
            translatedText={translatedText}
          />
        )}
      />
      <Route path="/notfound" component={NotFound} />
      <Route render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
};

AppRoutes.propTypes = {
  fetchEvents: PropTypes.func,
  fetchEventsByStyle: PropTypes.func,
  fetchFestivals: PropTypes.func,
  fetchFestivalsByStyle: PropTypes.func,
  fetchSingleEvent: PropTypes.func,
  fetchSingleFestival: PropTypes.func,
  singleEvent: PropTypes.object,
  singleFestival: PropTypes.object,
  eventError: PropTypes.object,
  festivalError: PropTypes.object,
  resetErrors: PropTypes.func.isRequired,
  resetFestivalsErrors: PropTypes.func.isRequired,
  toggleModal: PropTypes.func,
  toggleLoader: PropTypes.func.isRequired,
  translatedText: PropTypes.object
};

AppRoutes.defaultProps = {
  fetchEvents: null,
  fetchEventsByStyle: null,
  fetchFestivals: null,
  fetchFestivalsByStyle: null,
  fetchSingleEvent: null,
  fetchSingleFestival: null,
  singleEvent: null,
  singleFestival: null,
  eventError: { status: 0 },
  festivalError: { status: 0 },
  toggleModal: null,
  translatedText: {}
};

export default AppRoutes;
