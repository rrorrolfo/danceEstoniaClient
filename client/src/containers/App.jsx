/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchEvents,
  fetchEventsByStyle,
  fetchSingleEvent
} from '../actions/events';
import {
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleFestival
} from '../actions/festivals';
import Header from '../components/header';
import AppRoutes from '../routes';
import Loader from '../components/loader';
import './app.css';

const App = ({
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleEvent,
  fetchSingleFestival,
  singleEvent,
  singleFestival
}) => {
  const [isLoading, toggleLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => toggleLoading(!isLoading), 2000);
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppRoutes
          fetchEvents={fetchEvents}
          fetchEventsByStyle={fetchEventsByStyle}
          fetchFestivals={fetchFestivals}
          fetchSingleEvent={fetchSingleEvent}
          singleEvent={singleEvent}
          fetchFestivalsByStyle={fetchFestivalsByStyle}
          fetchSingleFestival={fetchSingleFestival}
          singleFestival={singleFestival}
        />
        {isLoading ? <Loader /> : null}
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    singleEvent: state.events.singleEvent,
    singleFestival: state.festivals.singleFestival
  };
};

const mapDispatchToProps = {
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleEvent,
  fetchSingleFestival
};

App.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsByStyle: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchFestivalsByStyle: PropTypes.func.isRequired,
  fetchSingleEvent: PropTypes.func.isRequired,
  fetchSingleFestival: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  singleEvent: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  singleFestival: PropTypes.object
};

App.defaultProps = {
  singleEvent: null,
  singleFestival: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
