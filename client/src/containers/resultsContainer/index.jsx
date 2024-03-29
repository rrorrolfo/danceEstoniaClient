import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import TimeFrameFilter from '../../components/timeFrameFilter';
import NavigationTabs from '../../components/tabs';
import SearchResults from '../../components/searchResults';
import { firstLetterToUppercase } from '../../utils';
import * as texts from '../../translations';

const ResultsContainer = ({
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  category,
  events,
  eventsByStyle,
  festivals,
  festivalsByStyle,
  toggleLoader,
  updateLoaderText,
  isAdmin,
  selectedLang
  /* topLevelMatch, */
}) => {
  const [currentTimeFrame, updateTimeframe] = useState('');
  const [dancingStyle, updateDancingStyle] = useState('');
  const [translatedText, updateTranslatedText] = useState({ ...texts.t__est });

  useEffect(() => {
    if (category === 'events') {
      updateTimeframe('week');
    }
    if (category === 'festivals') {
      updateTimeframe('month');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateTranslatedText(selectedLang === 'est' ? texts.t__est : texts.t__eng);
  }, [selectedLang]);

  const title = `${translatedText.body.upcoming} ${
    dancingStyle !== '' ? firstLetterToUppercase(dancingStyle) : ''
  } ${
    category === 'events'
      ? translatedText.general.partiesandEvents
      : translatedText.general.festivals
  }${' '}${
    category === 'events'
      ? `${translatedText.general.inEstonia}`
      : `${translatedText.general.inEurope}`
  }`;

  return (
    <Container>
      <h2 className="results-title centered">{title}</h2>
      {!isAdmin ? (
        <NavigationTabs
          category={category}
          fetchEvents={fetchEvents}
          fetchEventsByStyle={fetchEventsByStyle}
          fetchFestivals={fetchFestivals}
          fetchFestivalsByStyle={fetchFestivalsByStyle}
          translatedText={translatedText}
        />
      ) : null}
      {/* <TimeFrameFilter
          fetchEvents={fetchEvents}
          topLevelMatch={topLevelMatch}
          fetchEventsByStyle={fetchEventsByStyle}
          updateTimeFrame={updateTimeFrame}
        /> */}
      <Switch>
        <Route
          path="/admin/allEvents"
          exact
          render={({ match }) => (
            <SearchResults
              isAdmin={isAdmin}
              results={category === 'events' ? events : festivals}
              match={match}
              category={category}
              fetchEvents={fetchEvents}
              fetchFestivals={fetchFestivals}
              currentTimeFrame={currentTimeFrame}
              updateDancingStyle={updateDancingStyle}
              toggleLoader={toggleLoader}
              updateLoaderText={updateLoaderText}
              selectedLang={selectedLang}
              translatedText={translatedText}
            />
          )}
        />
        <Route
          path={`/${category}`}
          exact
          render={({ match }) => (
            <SearchResults
              results={category === 'events' ? events : festivals}
              match={match}
              category={category}
              fetchEvents={fetchEvents}
              fetchFestivals={fetchFestivals}
              currentTimeFrame={currentTimeFrame}
              updateDancingStyle={updateDancingStyle}
              toggleLoader={toggleLoader}
              updateLoaderText={updateLoaderText}
              selectedLang={selectedLang}
              translatedText={translatedText}
            />
          )}
        />
        <Route
          path={`/${category}/:style`}
          render={({ match }) => (
            <SearchResults
              results={category === 'events' ? eventsByStyle : festivalsByStyle}
              match={match}
              category={category}
              fetchEvents={fetchEvents}
              fetchEventsByStyle={fetchEventsByStyle}
              fetchFestivals={fetchFestivals}
              fetchFestivalsByStyle={fetchFestivalsByStyle}
              currentTimeFrame={currentTimeFrame}
              updateDancingStyle={updateDancingStyle}
              toggleLoader={toggleLoader}
              updateLoaderText={updateLoaderText}
              selectedLang={selectedLang}
              translatedText={translatedText}
            />
          )}
        />
      </Switch>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    events: state.events.events,
    eventsByStyle: state.events.eventsByStyle,
    festivals: state.festivals.festivals,
    festivalsByStyle: state.festivals.festivalsByStyle,
    selectedLang: state.config.lang
  };
};

ResultsContainer.propTypes = {
  fetchEvents: PropTypes.func,
  fetchEventsByStyle: PropTypes.func,
  fetchFestivals: PropTypes.func,
  fetchFestivalsByStyle: PropTypes.func,
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  eventsByStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  festivals: PropTypes.arrayOf(PropTypes.object),
  festivalsByStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  toggleLoader: PropTypes.func,
  isAdmin: PropTypes.bool,
  selectedLang: PropTypes.oneOf(['est', 'eng'])
  // eslint-disable-next-line react/forbid-prop-types
  // topLevelMatch: PropTypes.object
};

ResultsContainer.defaultProps = {
  events: null,
  eventsByStyle: null,
  fetchEvents: null,
  fetchFestivals: null,
  fetchEventsByStyle: null,
  festivals: null,
  fetchFestivalsByStyle: null,
  festivalsByStyle: null,
  toggleLoader: null,
  isAdmin: false,
  selectedLang: 'eng'
  // topLevelMatch: null
};

export default connect(mapStateToProps)(ResultsContainer);
