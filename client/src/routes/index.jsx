import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventsRoutes from './EventsRoutes';
import FestivalsRoutes from './FestivalsRoutes';
import ContactForm from '../components/contactForm';
import CreateEvent from '../components/createForm';
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
  toggleModal
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
          />
        )}
      />
      <Route path="/createEvent" component={CreateEvent} />
      <Route path="/contact" component={ContactForm} />
      <Route path="/admin/createEvent" component={CreateEvent} />
      <Route
        path="/admin/deleteEvents"
        render={() => <DeleteInterface toggleModal={toggleModal} />}
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
  // eslint-disable-next-line react/forbid-prop-types
  singleEvent: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  singleFestival: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  eventError: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  festivalError: PropTypes.object,
  resetErrors: PropTypes.func.isRequired,
  resetFestivalsErrors: PropTypes.func.isRequired
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
  festivalError: { status: 0 }
};

export default AppRoutes;
