import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TimeFrameGroup from '../timeframeGroup';
import PageCTA from '../paginationCTA';

const SearchResults = ({
  results,
  match,
  category,
  currentTimeFrame,
  updateDancingStyle
}) => {
  const [pageCount, updatePageCount] = useState(1);
  useEffect(() => {
    if (match.params.style) {
      updateDancingStyle(match.params.style);
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

  const checkAndDisplayResults = style => {
    switch (style) {
      case 'salsa':
        return displayTimeFramecontainers(results.salsa, currentTimeFrame);
      case 'bachata':
        return displayTimeFramecontainers(results.bachata, currentTimeFrame);
      case 'kizomba':
        return displayTimeFramecontainers(results.kizomba, currentTimeFrame);
      default:
        return displayTimeFramecontainers(results, currentTimeFrame);
    }
  };

  return (
    <React.Fragment>
      <Container className="results-container">
        {checkAndDisplayResults(match.params.style)}
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
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  results: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  currentTimeFrame: PropTypes.oneOf(['week', 'month', '']).isRequired,
  updateDancingStyle: PropTypes.func
};

SearchResults.defaultProps = {
  results: null,
  updateDancingStyle: null
};

export default SearchResults;
