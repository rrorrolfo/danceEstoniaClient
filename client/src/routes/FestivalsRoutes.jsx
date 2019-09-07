import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from '../containers/resultsContainer';
import EventDetails from '../components/eventDetails';
import Footer from '../components/footer';

const FestivalsRoutes = ({
  fetchSingleFestival,
  singleFestival,
  festivalError,
  resetFestivalsErrors,
  toggleLoader
}) => {
  return (
    <Switch>
      <Route
        path="/festivals"
        exact
        render={({ match }) => (
          <React.Fragment>
            <MainJumbotron category="festivals" />
            <ResultsContainer
              match={match}
              category="festivals"
              toggleLoader={toggleLoader}
            />
            <Footer />
          </React.Fragment>
        )}
      />
      <Route
        path="/festivals/:category"
        exact
        render={({ match }) => (
          <React.Fragment>
            <MainJumbotron category="festivals" match={match} />
            <ResultsContainer
              match={match}
              category="festivals"
              toggleLoader={toggleLoader}
            />
            <Footer />
          </React.Fragment>
        )}
      />

      <Route
        path="/festivals/:category/:id"
        exact
        render={({ match }) => (
          <React.Fragment>
            <EventDetails
              match={match}
              actionOnMount={fetchSingleFestival}
              category="festivals"
              singleFestival={singleFestival}
              error={festivalError}
              resetFestivalsErrors={resetFestivalsErrors}
              toggleLoader={toggleLoader}
            />
            <Footer />
          </React.Fragment>
        )}
      />
      <Route render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
};

FestivalsRoutes.propTypes = {
  fetchSingleFestival: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  singleFestival: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  festivalError: PropTypes.object,
  resetFestivalsErrors: PropTypes.func.isRequired,
  toggleLoader: PropTypes.func
};

FestivalsRoutes.defaultProps = {
  singleFestival: null,
  festivalError: { status: 0 },
  toggleLoader: null
};

export default FestivalsRoutes;
