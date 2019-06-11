import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';
import NavigationTabs from '../../components/tabs';
import ResultCard from '../../components/resultCard';

class ResultsContainer extends Component {
  state = {};

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchEvents();
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
  return { events: state.events };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer);
