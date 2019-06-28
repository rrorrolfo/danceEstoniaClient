import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from '../containers/resultsContainer';
import EventDetails from '../components/eventDetails';

const FestivalsRoutes = ({
  fetchEvents,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleFestival
}) => {
  return (
    <Switch>
      <Route
        path="/festivals"
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
              fetchFestivals={fetchFestivals}
              fetchFestivalsByStyle={fetchFestivalsByStyle}
              category="festivals"
            />
          </React.Fragment>
        )}
      />
      <Route
        path="/festivals/:category"
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
              fetchFestivals={fetchFestivals}
              fetchFestivalsByStyle={fetchFestivalsByStyle}
              category="festivals"
            />
          </React.Fragment>
        )}
      />

      <Route
        path="/festivals/:category/:id"
        exact
        render={({ match }) => (
          <EventDetails
            match={match}
            actionOnMount={fetchSingleFestival}
            category="festivals"
          />
        )}
      />
      <Route render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
};

FestivalsRoutes.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchFestivalsByStyle: PropTypes.func.isRequired,
  fetchSingleFestival: PropTypes.func.isRequired
};

export default FestivalsRoutes;
