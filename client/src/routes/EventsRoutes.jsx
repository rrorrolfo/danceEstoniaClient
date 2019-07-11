import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from '../containers/resultsContainer';
import EventDetails from '../components/eventDetails';
import Footer from '../components/footer';

const EventsRoutes = ({
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchSingleEvent,
  singleEvent
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
              category="events"
            />
            <ResultsContainer
              match={match}
              fetchEvents={fetchEvents}
              fetchEventsByStyle={fetchEventsByStyle}
              fetchFestivals={fetchFestivals}
              category="events"
            />
            <Footer />
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
              category="events"
              match={match}
            />
            <ResultsContainer
              match={match}
              fetchEvents={fetchEvents}
              fetchEventsByStyle={fetchEventsByStyle}
              fetchFestivals={fetchFestivals}
              category="events"
            />
            <Footer />
          </React.Fragment>
        )}
      />
      <Route
        path="/events/:category/:id"
        exact
        render={({ match }) => (
          <React.Fragment>
            <EventDetails
              match={match}
              actionOnMount={fetchSingleEvent}
              category="events"
              singleEvent={singleEvent}
            />
            <Footer />
          </React.Fragment>
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
  fetchSingleEvent: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  singleEvent: PropTypes.object
};

EventsRoutes.defaultProps = {
  singleEvent: null
};

export default EventsRoutes;
