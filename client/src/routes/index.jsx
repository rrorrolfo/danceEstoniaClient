/* eslint-disable no-shadow */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchEvents,
  fetchEventsByStyle,
  fetchSingleEvent
} from '../actions/events';
import {
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleFestival
} from '../actions/festivals';
import EventsRoutes from './EventsRoutes';
import FestivalsRoutes from './FestivalsRoutes';
import ContactForm from '../components/contactForm';
import NotFound from '../components/notFound';

const AppRoutes = ({
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleEvent,
  fetchSingleFestival,
  singleEvent,
  singleFestival
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
          />
        )}
      />
      <Route path="/contact" component={ContactForm} />
      <Route path="/notfound" component={NotFound} />
      <Route render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
    singleEvent: state.events.singleEvent,
    singleFestival: state.festivals.singleFestival
  };
};

const mapDispatchToProps = {
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleEvent,
  fetchSingleFestival
};

AppRoutes.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsByStyle: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchFestivalsByStyle: PropTypes.func.isRequired,
  fetchSingleEvent: PropTypes.func.isRequired,
  fetchSingleFestival: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  singleEvent: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  singleFestival: PropTypes.object
};

AppRoutes.defaultProps = {
  singleEvent: null,
  singleFestival: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoutes);
