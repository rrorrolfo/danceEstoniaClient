/* eslint-disable no-shadow */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEvents, fetchSingleEvent } from '../actions/events';
import { fetchFestivals, fetchSingleFestival } from '../actions/festivals';
import Header from '../components/header';
import AppRoutes from '../routes';
import './app.css';

const App = ({
  fetchEvents,
  fetchFestivals,
  fetchSingleEvent,
  fetchSingleFestival
}) => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppRoutes
          fetchEvents={fetchEvents}
          fetchFestivals={fetchFestivals}
          fetchSingleEvent={fetchSingleEvent}
          fetchSingleFestival={fetchSingleFestival}
        />
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  fetchEvents,
  fetchFestivals,
  fetchSingleEvent,
  fetchSingleFestival
};

App.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchSingleEvent: PropTypes.func.isRequired,
  fetchSingleFestival: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(App);
