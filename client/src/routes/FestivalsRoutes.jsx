/* eslint-disable react/forbid-prop-types */
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
  toggleLoader,
  updateLoaderText,
  translatedText,
  selectedLang,
  scrollTarget
}) => {
  return (
    <Switch>
      <Route
        path="/festivals"
        exact
        render={({ match }) => (
          <React.Fragment>
            <MainJumbotron
              category="festivals"
              translatedText={translatedText}
              scrollTarget={scrollTarget}
            />
            <ResultsContainer
              match={match}
              category="festivals"
              toggleLoader={toggleLoader}
              updateLoaderText={updateLoaderText}
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
              category="festivals"
              match={match}
              translatedText={translatedText}
              scrollTarget={scrollTarget}
            />
            <ResultsContainer
              match={match}
              category="festivals"
              toggleLoader={toggleLoader}
              updateLoaderText={updateLoaderText}
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
              translatedText={translatedText}
              selectedLang={selectedLang}
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
  singleFestival: PropTypes.object,
  festivalError: PropTypes.object,
  resetFestivalsErrors: PropTypes.func.isRequired,
  toggleLoader: PropTypes.func,
  translatedText: PropTypes.object,
  selectedLang: PropTypes.oneOf(['eng', 'est']),
  scrollTarget: PropTypes.object
};

FestivalsRoutes.defaultProps = {
  singleFestival: null,
  festivalError: { status: 0 },
  toggleLoader: null,
  translatedText: {},
  selectedLang: 'est',
  scrollTarget: null
};

export default FestivalsRoutes;
