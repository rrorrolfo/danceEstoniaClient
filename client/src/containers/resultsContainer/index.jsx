import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import NavigationTabs from '../../components/tabs';
import ResultCard from '../../components/resultCard';

class ResultsContainer extends Component {
  state = {};

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

export default ResultsContainer;
