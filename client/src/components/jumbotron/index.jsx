import React from 'react';
import { Jumbotron, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './jumbotron.css';

const MainJumbotron = ({ category, fetchEvents, fetchFestivals }) => {
  return (
    <Jumbotron>
      <div className="overlay" />
      <Container className="welcoming-wrapper">
        <h1 className="welcoming-title">
          Find the best dancing events in Estonia
        </h1>
        <p>Find the best dancing events in Estonia</p>
        <Nav
          defaultActiveKey={`/${category}`}
          as="ul"
          className="justify-content-center"
        >
          <Nav.Item as="li" className="category-cta">
            <NavLink to="/events" onClick={() => fetchEvents()}>
              Events
            </NavLink>
          </Nav.Item>
          <Nav.Item as="li" className="category-cta">
            <NavLink to="/festivals" onClick={() => fetchFestivals()}>
              Festivals
            </NavLink>
          </Nav.Item>
        </Nav>
      </Container>
    </Jumbotron>
  );
};

export default MainJumbotron;
