import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationTabs from '../../components/tabs';
import ResultCard from '../../components/resultCard';

const ResultsContainer = ({
  fetchEvents,
  fetchFestivals,
  category,
  events,
  festivals
}) => {
  useEffect(() => {
    if (category === 'events') {
      fetchEvents();
    } else if (category === 'festivals') {
      fetchFestivals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayResults = results => {
    return results.map(result => (
      <ResultCard result={result} key={result._id} />
    ));
  };

  return (
    <Container>
      <NavigationTabs
        category={category}
        fetchEvents={fetchEvents}
        fetchFestivals={fetchFestivals}
      />
      <Route
        path={`/${category}`}
        exact
        render={() => (
          <Container className="results-container">
            {category === 'events'
              ? displayResults(events)
              : displayResults(festivals)}
          </Container>
        )}
      />
      <Route
        path={`/${category}/:style`}
        render={() => (
          <Container className="results-container">
            {category === 'events'
              ? displayResults(events)
              : displayResults(festivals)}
          </Container>
        )}
      />
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
