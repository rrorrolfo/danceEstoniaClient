/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';
import NavigationTabs from '../../components/tabs';
import ResultCard from '../../components/resultCard';

const ResultsContainer = ({ getEvents, events }) => {
  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayResults = events.map(event => (
    <ResultCard result={event} key={event._id} />
  ));

  return (
    <Container>
      <NavigationTabs />
      <Container className="results-container">{displayResults}</Container>
    </Container>
  );
};

const mapStateToProps = state => {
  return { events: state.events.events };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(fetchEvents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer);
