/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';
import { fetchFestivals } from '../../actions/festivals';
import NavigationTabs from '../../components/tabs';
import ResultCard from '../../components/resultCard';

class ResultsContainer extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchEvents();
    this.props.fetchFestivals();
  }

  render() {
    return (
      <Container>
        <NavigationTabs />
        <Container className="results-container">
          <ResultCard />
          <ResultCard />
          <ResultCard />
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.events, festivals: state.festivals };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    fetchFestivals: () => dispatch(fetchFestivals())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer);
