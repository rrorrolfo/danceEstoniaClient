import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultCard from '../resultCard';
import { monthToString, weekToString } from '../../utils';

const TimeFrameGroup = ({
  dateHappening,
  year,
  timeFrame,
  events,
  category,
  match,
  isAdmin,
  canAuth,
  toggleLoader,
  updateLoaderText
}) => {
  const displayResults = resultsToDisplay => {
    return resultsToDisplay.map(event => {
      return (
        <ResultCard
          result={event}
          category={category}
          key={event._id}
          match={match}
          isAdmin={isAdmin}
          canAuth={canAuth}
          toggleLoader={toggleLoader}
          updateLoaderText={updateLoaderText}
        />
      );
    });
  };
  return (
    <React.Fragment>
      {timeFrame ? (
        <Container fluid className="timeGroupContainer">
          <h3 className="dateHappening">
            {timeFrame === 'month'
              ? monthToString(dateHappening, year)
              : weekToString(dateHappening, year)}
          </h3>
          {displayResults(events)}
        </Container>
      ) : null}
    </React.Fragment>
  );
};

TimeFrameGroup.propTypes = {
  timeFrame: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object,
  isAdmin: PropTypes.bool,
  canAuth: PropTypes.bool,
  toggleLoader: PropTypes.func
};

TimeFrameGroup.defaultProps = {
  match: null,
  isAdmin: false,
  canAuth: false,
  toggleLoader: null
};

export default TimeFrameGroup;
