/* eslint-disable no-shadow */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEvents } from '../actions/events';
import { fetchFestivals } from '../actions/festivals';
import Header from '../components/header';
import AppRoutes from '../routes';
import './app.css';

const App = ({ fetchEvents, fetchFestivals }) => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppRoutes fetchEvents={fetchEvents} fetchFestivals={fetchFestivals} />
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  fetchEvents,
  fetchFestivals
};

App.propTypes = {
  fetchEvents: PropTypes.func,
  fetchFestivals: PropTypes.func
};

App.defaultProps = {
  fetchEvents: null,
  fetchFestivals: null
};

export default connect(
  null,
  mapDispatchToProps
)(App);
