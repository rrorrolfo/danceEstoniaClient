import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ResultCard from '../../components/resultCard';

class ResultsContainer extends Component {
  state = {};

  render() {
    return (
      <Container>
        <ResultCard />
      </Container>
    );
  }
}

export default ResultsContainer;
