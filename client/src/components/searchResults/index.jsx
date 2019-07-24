import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TimeFrameGroup from '../timeframeGroup';

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
      if (category === 'events' && !results.length) {
        fetchEventsByStyle(`/events/${match.params.style}`);
      } else if (category === 'festivals' && !results.length) {
        fetchFestivalsByStyle(`/festivals/${match.params.style}`);
      }
    } else if (category === 'events' && !results.length) {
      fetchEvents();
    } else if (category === 'festivals' && !results.length) {
      fetchFestivals();
    }
  }, []);

  const displayTimeFramecontainers = (resultsByGroup, timeFrame = 'month') => {
    return resultsByGroup.map(group => (
      <TimeFrameGroup
        timeFrame={timeFrame === 'week' ? group._id.week : group._id.month}
        events={group.records}
        category={category}
        match={match}
      />
    ));
  };

  return (
    <Container className="results-container">
      {displayTimeFramecontainers(results)}
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
  match: PropTypes.object.isRequired
};

SearchResults.defaultProps = {
  results: null,
  fetchEventsByStyle: null,
  fetchFestivalsByStyle: null
};

export default SearchResults;
