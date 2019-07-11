import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from '../containers/resultsContainer';
import EventDetails from '../components/eventDetails';
import Footer from '../components/footer';

const FestivalsRoutes = ({
  fetchEvents,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleFestival,
  singleFestival
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
              category="festivals"
            />
            <ResultsContainer
              match={match}
              fetchEvents={fetchEvents}
              fetchFestivals={fetchFestivals}
              fetchFestivalsByStyle={fetchFestivalsByStyle}
              category="festivals"
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
            <MainJumbotron
              fetchEvents={fetchEvents}
              fetchFestivals={fetchFestivals}
              category="festivals"
              match={match}
            />
            <ResultsContainer
              match={match}
              fetchEvents={fetchEvents}
              fetchFestivals={fetchFestivals}
              fetchFestivalsByStyle={fetchFestivalsByStyle}
              category="festivals"
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
  fetchEvents: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchFestivalsByStyle: PropTypes.func.isRequired,
  fetchSingleFestival: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  singleFestival: PropTypes.object
};

FestivalsRoutes.defaultProps = {
  singleFestival: null
};

export default FestivalsRoutes;
