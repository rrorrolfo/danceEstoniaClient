/* eslint-disable react/forbid-prop-types */
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
import { setLanguage } from '../actions/config';
import Header from '../components/header';
import AppRoutes from '../routes';
import Loader from '../components/loader';
import MainModal from '../components/modal';
import * as texts from '../translations';
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
  resetFestivalsErrors,
  fetchingEvents,
  fetchingFestivals,
  selectedLang,
  setLanguage
}) => {
  const [isLoading, toggleLoader] = useState(true);
  const [showModal, toggleModal] = useState({
    show: false,
    category: '',
    callback: null
  });
  const [loaderText, updateLoaderText] = useState('Ready to dance?');
  const [translatedText, updateTranslatedText] = useState({ ...texts.t__est });

  useEffect(() => {
    fetchEvents();
    fetchFestivals();
    fetchEventsByStyle(`/events/salsa`, 'week', 'salsa');
    fetchEventsByStyle(`/events/bachata`, 'week', 'bachata');
    fetchEventsByStyle(`/events/kizomba`, 'week', 'kizomba');
    fetchFestivalsByStyle(`/festivals/salsa`, 'salsa');
    fetchFestivalsByStyle(`/festivals/bachata`, 'bachata');
    fetchFestivalsByStyle(`/festivals/kizomba`, 'kizomba');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!fetchingEvents && !fetchingFestivals) {
      toggleLoader(false);
    }
  }, [fetchingEvents, fetchingFestivals]);

  useEffect(() => {
    if (eventError.status !== 0) {
      resetErrors();
    }

    if (festivalError.status !== 0) {
      resetFestivalsErrors();
    }
  }, [eventError, festivalError, resetErrors, resetFestivalsErrors]);

  useEffect(() => {
    updateTranslatedText(selectedLang === 'est' ? texts.t__est : texts.t__eng);
  }, [selectedLang]);

  return (
    <BrowserRouter>
      <div>
        <Header
          translatedText={translatedText}
          selectedLang={selectedLang}
          setLanguage={setLanguage}
        />
        <AppRoutes
          fetchSingleEvent={fetchSingleEvent}
          singleEvent={singleEvent}
          fetchSingleFestival={fetchSingleFestival}
          singleFestival={singleFestival}
          eventError={eventError}
          festivalError={festivalError}
          resetErrors={resetErrors}
          resetFestivalsErrors={resetFestivalsErrors}
          toggleLoader={toggleLoader}
          toggleModal={toggleModal}
          updateLoaderText={updateLoaderText}
          translatedText={translatedText}
        />
        <MainModal
          show={showModal.show}
          toggleModal={toggleModal}
          category={showModal.category}
          action={showModal.callback}
        />
        {isLoading ? <Loader text={loaderText} /> : null}
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    singleEvent: state.events.singleEvent,
    singleFestival: state.festivals.singleFestival,
    eventError: state.events.errors,
    festivalError: state.festivals.errors,
    fetchingEvents: state.events.fetching,
    fetchingFestivals: state.festivals.fetching,
    selectedLang: state.config.lang
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
  resetFestivalsErrors,
  setLanguage
};

App.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsByStyle: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchFestivalsByStyle: PropTypes.func.isRequired,
  fetchSingleEvent: PropTypes.func.isRequired,
  fetchSingleFestival: PropTypes.func.isRequired,
  singleEvent: PropTypes.object,
  singleFestival: PropTypes.object,
  eventError: PropTypes.object,
  festivalError: PropTypes.object,
  resetErrors: PropTypes.func.isRequired,
  resetFestivalsErrors: PropTypes.func.isRequired,
  selectedLang: PropTypes.string,
  setLanguage: PropTypes.func.isRequired
};

App.defaultProps = {
  singleEvent: null,
  singleFestival: null,
  eventError: { status: 0 },
  festivalError: { status: 0 },
  selectedLang: 'est'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
