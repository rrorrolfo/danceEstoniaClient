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
  fetchFestivalsByStyle,
  currentTimeFrame,
  updateDancingStyle
}) => {
  useEffect(() => {
    if (match.params.style) {
      console.log(match.params.style);
      updateDancingStyle(match.params.style);
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
    if (!match.params.style) {
      updateDancingStyle('');
    }
    // eslint-disable-next-line
  }, [match]);

  const displayTimeFramecontainers = (resultsByGroup, timeFrame = 'month') => {
    return resultsByGroup.map(group => (
      <TimeFrameGroup
        dateHappening={timeFrame === 'week' ? group._id.week : group._id.month}
        timeFrame={timeFrame}
        events={group.records}
        category={category}
        match={match}
        key={timeFrame === 'week' ? group._id.week : group._id.month}
      />
    ));
  };

  return (
    <Container className="results-container">
      {displayTimeFramecontainers(results, currentTimeFrame)}
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
  match: PropTypes.object.isRequired,
  currentTimeFrame: PropTypes.oneOf(['week', 'month', '']).isRequired,
  updateDancingStyle: PropTypes.func
};

SearchResults.defaultProps = {
  results: null,
  fetchEventsByStyle: null,
  fetchFestivalsByStyle: null,
  updateDancingStyle: null
};

export default SearchResults;
