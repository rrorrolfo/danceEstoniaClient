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
  match,
  isAdmin
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
              ? monthToString(dateHappening)
              : weekToString(dateHappening)}
          </h3>
          {displayResults(events)}
        </Container>
      ) : null}
    </React.Fragment>
  );
};

TimeFrameGroup.propTypes = {
  timeFrame: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object,
  isAdmin: PropTypes.bool
};

TimeFrameGroup.defaultProps = {
  match: null,
  isAdmin: false
};

export default TimeFrameGroup;
