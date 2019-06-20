/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';
import { fetchFestivals } from '../../actions/festivals';
import NavigationTabs from '../../components/tabs';
import ResultCard from '../../components/resultCard';

const ResultsContainer = ({
  getEvents,
  getFestivals,
  events,
  festivals,
  match
}) => {
  useEffect(() => {
    if (match.params.category === 'events') {
      getEvents();
    } else {
      getFestivals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayResults = results => {
    return results.map(result => (
      <ResultCard result={result} key={result._id} />
    ));
  };

  return (
    <Container>
      <NavigationTabs />
      <Container className="results-container">
        {match.params.category === 'events'
          ? displayResults(events)
          : displayResults(festivals)}
      </Container>
    </Container>
  );
};

const mapStateToProps = state => {
  return { events: state.events.events, festivals: state.festivals.festivals };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(fetchEvents()),
    getFestivals: () => dispatch(fetchFestivals())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer);
