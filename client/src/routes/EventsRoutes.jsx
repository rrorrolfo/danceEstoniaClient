import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from '../containers/resultsContainer';

const EventsRoutes = ({ fetchEvents, fetchFestivals }) => {
  return (
    <Route
      path="/"
      render={({ match }) => (
        <React.Fragment>
          <MainJumbotron
            fetchEvents={fetchEvents}
            fetchFestivals={fetchFestivals}
          />
          <ResultsContainer
            match={match}
            fetchEvents={fetchEvents}
            fetchFestivals={fetchFestivals}
            category="events"
          />
        </React.Fragment>
      )}
    />
  );
};

EventsRoutes.propTypes = {
  fetchEvents: PropTypes.func,
  fetchFestivals: PropTypes.func
};

EventsRoutes.defaultProps = {
  fetchEvents: null,
  fetchFestivals: null
};

export default EventsRoutes;
