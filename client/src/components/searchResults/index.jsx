import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultCard from '../resultCard';

const SearchResults = ({
  results,
  match,
  category,
  fetchEvents,
  fetchEventsByStyle,
  fetchFestivals,
  fetchFestivalsByStyle
}) => {
  useEffect(() => {
    if (match.params.style) {
      if (category === 'events') {
        fetchEventsByStyle(`/events/${match.params.style}`);
      } else {
        fetchFestivalsByStyle(`/festivals/${match.params.style}`);
      }
    } else if (category === 'events') {
      fetchEvents();
    } else {
      fetchFestivals();
    }
  }, []);
  const displayResults = resultsToDisplay => {
    return resultsToDisplay.map(result => (
      <ResultCard
        result={result}
        category={category}
        key={result._id}
        match={match}
      />
    ));
  };
  return (
    <Container className="results-container">
      {displayResults(results)}
    </Container>
  );
};

SearchResults.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsByStyle: PropTypes.func,
  fetchFestivals: PropTypes.func.isRequired,
  fetchFestivalsByStyle: PropTypes.func,
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object
};

SearchResults.defaultProps = {
  results: null,
  match: null,
  fetchEventsByStyle: null,
  fetchFestivalsByStyle: null
};

export default SearchResults;
