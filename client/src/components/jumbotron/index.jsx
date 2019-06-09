import React from 'react';
import { Jumbotron, Button, Container, ButtonGroup } from 'react-bootstrap';
import './jumbotron.css';

const MainJumbotron = () => {
  return (
    <Jumbotron>
      <div className="overlay" />
      <Container className="welcoming-wrapper">
        <h1 className="welcoming-title">
          Find the best dancing events in Estonia
        </h1>
        <p>Find the best dancing events in Estonia</p>
        <ButtonGroup className="mt-3 ctas-container">
          <Button className="cta-style">Events</Button>
          <Button className="cta-style">Festivals</Button>
        </ButtonGroup>
      </Container>
    </Jumbotron>
  );
};

export default MainJumbotron;
