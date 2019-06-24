/* eslint-disable no-shadow */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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

export default connect(
  null,
  mapDispatchToProps
)(App);
