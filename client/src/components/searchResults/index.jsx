import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TimeFrameGroup from '../timeframeGroup';
import PageCTA from '../paginationCTA';

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
  const [pageCount, updatePageCount] = useState(1);
  useEffect(() => {
    if (match.params.style) {
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
    const resultsToDisplay = [];
    resultsByGroup.filter(result => {
      if (resultsByGroup.indexOf(result) <= pageCount * 3 - 1) {
        resultsToDisplay.push(result);
      }
      return true;
    });
    return resultsToDisplay.map(group => (
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
    <React.Fragment>
      <Container className="results-container">
        {displayTimeFramecontainers(results, currentTimeFrame)}
      </Container>
      {pageCount * 3 - 1 < results.length ? (
        <PageCTA
          category={category}
          pageCount={pageCount}
          updatePageCount={updatePageCount}
        />
      ) : null}
    </React.Fragment>
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
