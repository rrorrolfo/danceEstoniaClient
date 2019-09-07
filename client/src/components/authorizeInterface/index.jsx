import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TimeFrameGroup from '../timeframeGroup';
import { apiRequest } from '../../requests/requests';

const AuthInterface = ({ canAuth }) => {
  const [eventsResults, updateEventsResults] = useState([]);
  const [festivalsResults, updateFestivalsResults] = useState([]);

  useEffect(() => {
    apiRequest({ endPoint: '/events', unauthorized: 1 })
      .then(response => {
        updateEventsResults(response);
      })
      .catch(error => console.log(error));
    apiRequest({ endPoint: '/festivals', unauthorized: 1 })
      .then(response => updateFestivalsResults(response))
      .catch(error => console.log(error));
  }, []);

  const displayTimeFramecontainers = (
    resultsByGroup,
    timeFrame = 'month',
    category
  ) => {
    return resultsByGroup.map(group => (
      <TimeFrameGroup
        dateHappening={timeFrame === 'week' ? group._id.week : group._id.month}
        timeFrame={timeFrame}
        events={group.records}
        category={category}
        isAdmin
        canAuth={canAuth}
        key={
          timeFrame === 'week'
            ? `${group._id.week}-${Math.random()}`
            : `${group._id.month}-${Math.random()}`
        }
      />
    ));
  };

  return (
    <Container className="results-container">
      <Container>
        <h2 className="centered" style={{ marginTop: '65px' }}>
          - Unauthorized Events -
        </h2>
        {eventsResults.length ? (
          displayTimeFramecontainers(eventsResults, 'week', 'events')
        ) : (
          <h3 className="centered" style={{ marginTop: '25px' }}>
            No unauthorized events were obtained
          </h3>
        )}
      </Container>
      <Container>
        <h2 className="centered" style={{ marginTop: '65px' }}>
          - Unauthorized Festivals -
        </h2>
        {festivalsResults.length ? (
          displayTimeFramecontainers(festivalsResults, 'month', 'festivals')
        ) : (
          <h3 className="centered" style={{ marginTop: '25px' }}>
            No unauthorized festivals were obtained
          </h3>
        )}
      </Container>
    </Container>
  );
};

AuthInterface.propTypes = {
  canAuth: PropTypes.bool
};

AuthInterface.defaultProps = {
  canAuth: false
};

export default AuthInterface;
