/* eslint-disable no-shadow */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEvents, fetchSingleEvent } from '../actions/events';
import { fetchFestivals, fetchSingleFestival } from '../actions/festivals';
import EventsRoutes from './EventsRoutes';
import FestivalsRoutes from './FestivalsRoutes';
import NotFound from '../components/notFound';

const AppRoutes = ({
  fetchEvents,
  fetchFestivals,
  fetchSingleEvent,
  fetchSingleFestival
}) => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/events" />} />
      <Route
        path="/events"
        render={() => (
          <EventsRoutes
            fetchEvents={fetchEvents}
            fetchFestivals={fetchFestivals}
            fetchSingleEvent={fetchSingleEvent}
          />
        )}
      />
      <Route
        path="/festivals"
        render={() => (
          <FestivalsRoutes
            fetchEvents={fetchEvents}
            fetchFestivals={fetchFestivals}
            fetchSingleFestival={fetchSingleFestival}
          />
        )}
      />
      <Route path="/notfound" component={NotFound} />
      <Route render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
};

AppRoutes.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchSingleEvent: PropTypes.func.isRequired,
  fetchSingleFestival: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  fetchEvents,
  fetchFestivals,
  fetchSingleEvent,
  fetchSingleFestival
};

export default connect(
  null,
  mapDispatchToProps
)(AppRoutes);
