import React from 'react';
import { Jumbotron, Button, Container } from 'react-bootstrap';
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
        <p>
          <Button>All</Button>
          <Button>Salsa</Button>
          <Button>Bachata</Button>
          <Button>Kizomba</Button>
        </p>
      </Container>
    </Jumbotron>
  );
};

export default MainJumbotron;
