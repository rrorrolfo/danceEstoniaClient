import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationTabs from '../../components/tabs';
import SearchResults from '../../components/searchResults';

const ResultsContainer = ({
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle,
  category,
  events,
  eventsByStyle,
  festivals,
  festivalsByStyle
}) => {
  return (
    <Container>
      <NavigationTabs
        category={category}
        fetchEvents={fetchEvents}
        fetchEventsByStyle={fetchEventsByStyle}
        fetchFestivals={fetchFestivals}
        fetchFestivalsByStyle={fetchFestivalsByStyle}
      />
      <Switch>
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
    festivalsByStyle: state.festivals.festivalsByStyle
  };
};

ResultsContainer.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsByStyle: PropTypes.func,
  fetchFestivals: PropTypes.func.isRequired,
  fetchFestivalsByStyle: PropTypes.func,
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  eventsByStyle: PropTypes.arrayOf(PropTypes.object),
  festivals: PropTypes.arrayOf(PropTypes.object),
  festivalsByStyle: PropTypes.arrayOf(PropTypes.object)
};

ResultsContainer.defaultProps = {
  events: null,
  eventsByStyle: null,
  fetchEventsByStyle: null,
  festivals: null,
  fetchFestivalsByStyle: null,
  festivalsByStyle: null
};

export default connect(mapStateToProps)(ResultsContainer);
