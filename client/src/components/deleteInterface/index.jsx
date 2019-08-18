import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TimeFrameGroup from '../timeframeGroup';
import { apiRequest, deleteRequest } from '../../requests/requests';

const DeleteInterface = ({ toggleModal }) => {
  const [eventsResults, updateEventsResults] = useState([]);
  const [festivalsResults, updateFestivalsResults] = useState([]);

  useEffect(() => {
    apiRequest({ endPoint: '/events', delete: 1 })
      .then(response => {
        updateEventsResults(response);
      })
      .catch(error => console.log(error));
    apiRequest({ endPoint: '/festivals', delete: 1 })
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
        key={
          timeFrame === 'week'
            ? `${group._id.week}-${Math.random()}`
            : `${group._id.month}-${Math.random()}`
        }
      />
    ));
  };

  /**
   * @param string.oneof(["events", "festivals"]) cat Determines the category of events wich will be erased
   */
  const eraseAll = cat => {
    if (cat === 'events') {
      return eventsResults.forEach(event => {
        event.records.forEach(record => {
          deleteRequest({
            endPoint: `/events/${record._id}`
          })
            .then(response =>
              console.log(`${response} ${cat} erased with id: ${record._id}`)
            )
            .catch(error =>
              window.alert(`${error} for event record: ${record._id}`)
            );
        });
      });
    }
    return festivalsResults.forEach(festival => {
      festival.records.forEach(record => {
        deleteRequest({
          endPoint: `/festivals/${record._id}`
        })
          .then(response =>
            console.log(`${response} ${cat} erased with id: ${record._id}`)
          )
          .catch(error =>
            window.alert(`${error} for festival record: ${record._id}`)
          );
      });
    });
  };

  return (
    <Container className="results-container">
      <Container>
        <h2 className="centered" style={{ marginTop: '65px' }}>
          - Past Events -
        </h2>
        <Button
          style={{ display: 'block', margin: '15px auto' }}
          variant="danger"
          onClick={() =>
            toggleModal({ show: true, category: 'events', callback: eraseAll })
          }
          disabled={eventsResults.length === 0}
        >
          Erase all Events
        </Button>
        {eventsResults.length ? (
          displayTimeFramecontainers(eventsResults, 'week', 'events')
        ) : (
          <h3 className="centered" style={{ marginTop: '25px' }}>
            No past event results were obtained
          </h3>
        )}
      </Container>
      <Container>
        <h2 className="centered" style={{ marginTop: '65px' }}>
          - Past Festivals -
        </h2>
        <Button
          style={{ display: 'block', margin: '15px auto' }}
          variant="danger"
          onClick={() =>
            toggleModal({
              show: true,
              category: 'festivals',
              callback: eraseAll
            })
          }
          disabled={festivalsResults.length === 0}
        >
          Erase all Festivals
        </Button>
        {festivalsResults.length ? (
          displayTimeFramecontainers(festivalsResults, 'month', 'festivals')
        ) : (
          <h3 className="centered" style={{ marginTop: '25px' }}>
            No past festival results were obtained
          </h3>
        )}
      </Container>
    </Container>
  );
};

export default DeleteInterface;
