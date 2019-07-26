import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultCard from '../resultCard';
import { monthToString, weekToString } from '../../utils';

const TimeFrameGroup = ({
  dateHappening,
  timeFrame,
  events,
  category,
  match
}) => {
  const displayResults = resultsToDisplay => {
    return resultsToDisplay.map(event => {
      return (
        <ResultCard
          result={event}
          category={category}
          key={event._id}
          match={match}
        />
      );
    });
  };
  return (
    <Container fluid>
      <h1>
        {timeFrame === 'month'
          ? monthToString(dateHappening)
          : weekToString(dateHappening)}
      </h1>
      {displayResults(events)}
    </Container>
  );
};

TimeFrameGroup.propTypes = {
  timeFrame: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired
};

export default TimeFrameGroup;
