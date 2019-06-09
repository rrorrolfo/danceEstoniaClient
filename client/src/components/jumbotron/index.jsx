import React from 'react';
import { Jumbotron, Container, Nav } from 'react-bootstrap';
import './jumbotron.css';

const MainJumbotron = ({ match }) => {
  return (
    <Jumbotron>
      <div className="overlay" />
      <Container className="welcoming-wrapper">
        <h1 className="welcoming-title">
          Find the best dancing events in Estonia
        </h1>
        <p>Find the best dancing events in Estonia</p>
        <Nav
          defaultActiveKey={`/${match.params.category}`}
          as="ul"
          className="justify-content-center"
        >
          <Nav.Item as="li" className="category-cta">
            <Nav.Link href="/events">Events</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li" className="category-cta">
            <Nav.Link href="/festivals">Festivals</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Jumbotron>
  );
};

export default MainJumbotron;
