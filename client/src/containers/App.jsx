/* eslint-disable no-shadow */
import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/events';
import { fetchFestivals } from '../actions/festivals';
import Header from '../components/header';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from './resultsContainer';
import './app.css';

const App = ({ fetchEvents, fetchFestivals }) => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" exact render={() => <Redirect to="/events" />} />
        <Route
          path="/:category"
          render={({ match }) => (
            <React.Fragment>
              <MainJumbotron
                match={match}
                fetchEvents={fetchEvents}
                fetchFestivals={fetchFestivals}
              />
              <ResultsContainer
                match={match}
                fetchEvents={fetchEvents}
                fetchFestivals={fetchFestivals}
              />
            </React.Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  fetchEvents,
  fetchFestivals
};

export default connect(
  null,
  mapDispatchToProps
)(App);
