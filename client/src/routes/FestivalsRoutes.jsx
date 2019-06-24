import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from '../containers/resultsContainer';
import EventDetails from '../components/eventDetails';

const FestivalsRoutes = ({ fetchEvents, fetchFestivals }) => {
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
              category="festivals"
            />
          </React.Fragment>
        )}
      />

      <Route path="/festivals/:category/:id" exact component={EventDetails} />
      <Route render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
};

FestivalsRoutes.propTypes = {
  fetchEvents: PropTypes.func,
  fetchFestivals: PropTypes.func
};

FestivalsRoutes.defaultProps = {
  fetchEvents: null,
  fetchFestivals: null
};

export default FestivalsRoutes;
