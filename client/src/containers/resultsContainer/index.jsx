import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationTabs from '../../components/tabs';
import SearchResults from '../../components/searchResults';

const ResultsContainer = ({
  fetchEvents,
  fetchFestivals,
  category,
  events,
  festivals
}) => {
  return (
    <Container>
      <NavigationTabs
        category={category}
        fetchEvents={fetchEvents}
        fetchFestivals={fetchFestivals}
      />
      <Switch>
        <Route
          path={`/${category}`}
          exact
          render={() => (
            <SearchResults
              results={category === 'events' ? events : festivals}
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
              results={category === 'events' ? events : festivals}
              match={match}
              category={category}
              fetchEvents={fetchEvents}
              fetchFestivals={fetchFestivals}
            />
          )}
        />
      </Switch>
    </Container>
  );
};

const mapStateToProps = state => {
  return { events: state.events.events, festivals: state.festivals.festivals };
};

ResultsContainer.propTypes = {
  fetchEvents: PropTypes.func,
  fetchFestivals: PropTypes.func,
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  festivals: PropTypes.arrayOf(PropTypes.object)
};

ResultsContainer.defaultProps = {
  fetchEvents: null,
  fetchFestivals: null,
  events: null,
  festivals: null
};

export default connect(mapStateToProps)(ResultsContainer);
