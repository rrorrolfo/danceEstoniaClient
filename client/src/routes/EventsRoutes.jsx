import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from '../containers/resultsContainer';
import EventDetails from '../components/eventDetails';

const EventsRoutes = ({
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchSingleEvent
}) => {
  return (
    <Switch>
      <Route
        path="/events"
        exact
        render={({ match }) => (
          <React.Fragment>
            <MainJumbotron
              fetchEvents={fetchEvents}
              fetchFestivals={fetchFestivals}
            />
            <ResultsContainer
              match={match}
              fetchEvents={fetchEvents}
              fetchEventsByStyle={fetchEventsByStyle}
              fetchFestivals={fetchFestivals}
              category="events"
            />
          </React.Fragment>
        )}
      />
      <Route
        path="/events/:category"
        exact
        render={({ match }) => (
          <React.Fragment>
            <MainJumbotron
              fetchEvents={fetchEvents}
              fetchFestivals={fetchFestivals}
            />
            <ResultsContainer
              match={match}
              fetchEvents={fetchEvents}
              fetchEventsByStyle={fetchEventsByStyle}
              fetchFestivals={fetchFestivals}
              category="events"
            />
          </React.Fragment>
        )}
      />
      <Route
        path="/events/:category/:id"
        exact
        render={({ match }) => (
          <EventDetails
            match={match}
            actionOnMount={fetchSingleEvent}
            category="events"
          />
        )}
      />
      <Route render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
};

EventsRoutes.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsByStyle: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchSingleEvent: PropTypes.func.isRequired
};

export default EventsRoutes;
