import React from 'react';
import { Jumbotron, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './jumbotron.css';

const MainJumbotron = ({ category, translatedText }) => {
  const simpleTitle = () =>
    category === 'events'
      ? translatedText.jumbotron.titleEvents
      : translatedText.jumbotron.titleFestivals;
  return (
    <Jumbotron className="main-jumbotron">
      <div className="overlay" />
      <Container className="welcoming-wrapper">
        <h1 className="welcoming-title">{simpleTitle()}</h1>
        <Nav
          activeKey={`/${category}}`}
          as="ul"
          className="justify-content-center"
        >
          <Nav.Item as="li" className="category-cta">
            <NavLink to="/events">
              {translatedText.general.partiesandEvents}
            </NavLink>
          </Nav.Item>
          <Nav.Item as="li" className="category-cta">
            <NavLink to="/festivals">
              {translatedText.general.festivals}
            </NavLink>
          </Nav.Item>
        </Nav>
      </Container>
    </Jumbotron>
  );
};

Jumbotron.propTypes = {
  category: PropTypes.oneOf(['events', 'festivals']),
  // eslint-disable-next-line react/forbid-prop-types
  translatedText: PropTypes.object
};

Jumbotron.defaultProps = {
  category: null,
  translatedText: {}
};

export default MainJumbotron;
