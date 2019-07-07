import React from 'react';
import { Jumbotron, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './jumbotron.css';

const MainJumbotron = ({ category, fetchEvents, fetchFestivals }) => {
  return (
    <Jumbotron className="main-jumbotron">
      <div className="overlay" />
      <Container className="welcoming-wrapper">
        <h1 className="welcoming-title">
          Find the best dancing events in Estonia
        </h1>
        <Nav
          defaultActiveKey={`/${category}}`}
          as="ul"
          className="justify-content-center"
        >
          <Nav.Item as="li" className="category-cta">
            <NavLink to="/events" onClick={() => fetchEvents()}>
              Parties & Events
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

Jumbotron.propTypes = {
  category: PropTypes.oneOf(['events', 'festivals'])
};

Jumbotron.defaultProps = {
  category: null
};

export default MainJumbotron;
