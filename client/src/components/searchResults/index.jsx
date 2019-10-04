/* eslint-disable react/forbid-prop-types */
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
  toggleLoader,
  updateLoaderText,
  isAdmin,
  selectedLang,
  translatedText
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
            {category === 'events'
              ? translatedText.body.noResultsEvents
              : translatedText.body.noResultsFestivals}
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
            isAdmin={isAdmin}
            dateHappening={
              timeFrame === 'week' ? group._id.week : group._id.month
            }
            year={group._id.year}
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
            updateLoaderText={updateLoaderText}
            selectedLang={selectedLang}
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
  match: PropTypes.object.isRequired,
  currentTimeFrame: PropTypes.oneOf(['week', 'month', '']).isRequired,
  updateDancingStyle: PropTypes.func,
  toggleLoader: PropTypes.func,
  isAdmin: PropTypes.bool,
  selectedLang: PropTypes.oneOf(['est', 'eng']),
  translatedText: PropTypes.object
};

SearchResults.defaultProps = {
  results: null,
  updateDancingStyle: null,
  toggleLoader: null,
  isAdmin: false,
  selectedLang: 'est',
  translatedText: {}
};

export default withRouter(SearchResults);
