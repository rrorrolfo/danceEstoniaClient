import React from 'react';
import { Jumbotron, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './jumbotron.css';

const MainJumbotron = ({ category, fetchEvents, fetchFestivals, match }) => {
  /**
   * @param string cat Category selected, one of ["events", "festivals"]
   * @param string style dancing style selected
   */
  const displayTitle = (cat = null, style = null) => {
    switch (cat) {
      case 'events':
        return `Find the best ${style} ${cat} in Estonia`;

      case 'festivals':
        return `Find the best ${style} ${cat} in Europe`;

      default:
        return `Find the best dancing ${category} in Estonia`;
    }
  };
  const simpleTitle = () =>
    category === 'events'
      ? 'Find the best dancing events in Estonia'
      : 'Find the best festivals in Europe';
  return (
    <Jumbotron className="main-jumbotron">
      <div className="overlay" />
      <Container className="welcoming-wrapper">
        <h1 className="welcoming-title">
          {match
            ? displayTitle(category, match.params.category)
            : simpleTitle()}
        </h1>
        <Nav
          activeKey={`/${category}}`}
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
