/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchEvents,
  fetchEventsByStyle,
  fetchSingleEvent,
  resetErrors
} from '../actions/events';
import {
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleFestival,
  resetFestivalsErrors
} from '../actions/festivals';
import Header from '../components/header';
import AppRoutes from '../routes';
import Loader from '../components/loader';
import MainModal from '../components/modal';
import './app.css';

const App = ({
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleEvent,
  fetchSingleFestival,
  singleEvent,
  singleFestival,
  eventError,
  festivalError,
  resetErrors,
  resetFestivalsErrors
}) => {
  const [isLoading, toggleLoading] = useState(true);
  const [showModal, toggleModal] = useState({
    show: false,
    category: '',
    callback: null
  });

  useEffect(() => {
    fetchEvents();
    fetchFestivals();
    fetchEventsByStyle(`/events/salsa`, 'week', 'salsa');
    fetchEventsByStyle(`/events/bachata`, 'week', 'bachata');
    fetchEventsByStyle(`/events/kizomba`, 'week', 'kizomba');
    fetchFestivalsByStyle(`/festivals/salsa`, 'salsa');
    fetchFestivalsByStyle(`/festivals/bachata`, 'bachata');
    fetchFestivalsByStyle(`/festivals/kizomba`, 'kizomba');
    setTimeout(() => toggleLoading(!isLoading), 2000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (eventError.status !== 0) {
      resetErrors();
    }

    if (festivalError.status !== 0) {
      resetFestivalsErrors();
    }
  }, [eventError, festivalError, resetErrors, resetFestivalsErrors]);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppRoutes
          fetchSingleEvent={fetchSingleEvent}
          singleEvent={singleEvent}
          fetchSingleFestival={fetchSingleFestival}
          singleFestival={singleFestival}
          eventError={eventError}
          festivalError={festivalError}
          resetErrors={resetErrors}
          resetFestivalsErrors={resetFestivalsErrors}
          toggleModal={toggleModal}
        />
        <MainModal
          show={showModal.show}
          toggleModal={toggleModal}
          category={showModal.category}
          action={showModal.callback}
        />
        {isLoading ? <Loader /> : null}
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    singleEvent: state.events.singleEvent,
    singleFestival: state.festivals.singleFestival,
    eventError: state.events.errors,
    festivalError: state.festivals.errors
  };
};

const mapDispatchToProps = {
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  fetchSingleEvent,
  fetchSingleFestival,
  resetErrors,
  resetFestivalsErrors
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
  singleFestival: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  eventError: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  festivalError: PropTypes.object,
  resetErrors: PropTypes.func.isRequired,
  resetFestivalsErrors: PropTypes.func.isRequired
};

App.defaultProps = {
  singleEvent: null,
  singleFestival: null,
  eventError: { status: 0 },
  festivalError: { status: 0 }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
