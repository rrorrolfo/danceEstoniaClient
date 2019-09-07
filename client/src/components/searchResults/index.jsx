import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TimeFrameGroup from '../timeframeGroup';
import PageCTA from '../paginationCTA';

const SearchResults = ({
  results,
  match,
  category,
  currentTimeFrame,
  updateDancingStyle,
  history,
  toggleLoader
}) => {
  const [pageCount, updatePageCount] = useState(1);
  const { style } = match.params;
  useEffect(() => {
    if (style) {
      updateDancingStyle(style);
    }
    if (!style) {
      updateDancingStyle('');
    }
  }, [style, updateDancingStyle]);

  const displayTimeFramecontainers = (resultsByGroup, timeFrame = 'month') => {
    if (!resultsByGroup.length) {
      return (
        <Container className="no-results-message">
          <h3 className="centered">
            Sorry!, We couldn´t find any {style} {category}, please check later.
          </h3>
        </Container>
      );
    }

    if (
      style === undefined ||
      style === 'salsa' ||
      style === 'bachata' ||
      style === 'kizomba'
    ) {
      return resultsByGroup
        .filter(result => resultsByGroup.indexOf(result) <= pageCount * 3 - 1)
        .map(group => (
          <TimeFrameGroup
            dateHappening={
              timeFrame === 'week' ? group._id.week : group._id.month
            }
            timeFrame={timeFrame}
            events={group.records}
            category={category}
            match={match}
            key={
              timeFrame === 'week'
                ? `${group._id.week}-${Math.random()}`
                : `${group._id.month}-${Math.random()}`
            }
            toggleLoader={toggleLoader}
          />
        ));
    }
    history.push('/notFound', { errorStatus: 404 });
    return false;
  };

  const checkAndDisplayResults = dancingStyle => {
    switch (dancingStyle) {
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
        {checkAndDisplayResults(style)}
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
  updateDancingStyle: PropTypes.func,
  toggleLoader: PropTypes.func
};

SearchResults.defaultProps = {
  results: null,
  updateDancingStyle: null,
  toggleLoader: null
};

export default withRouter(SearchResults);
