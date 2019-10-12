import React from 'react';
import { Jumbotron, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './jumbotron.css';
import { scrollToRef } from '../../utils';

const MainJumbotron = ({ category, translatedText, scrollTarget }) => {
  return (
    <Jumbotron className="main-jumbotron">
      <div className="overlay" ref={scrollTarget} />
      <Container className="welcoming-wrapper">
        <h1 className="welcoming-title">
          {category === 'events'
            ? translatedText.jumbotron.titleEvents
            : translatedText.jumbotron.titleFestivals}
        </h1>
        <Nav
          activeKey={`/${category}}`}
          as="ul"
          className="justify-content-center"
        >
          <Nav.Item as="li" className="category-cta">
            <NavLink
              to="/events"
              onClick={() =>
                scrollToRef(0, scrollTarget.current.offsetHeight - 65)
              }
            >
              {translatedText.general.partiesandEvents}
            </NavLink>
          </Nav.Item>
          <Nav.Item as="li" className="category-cta">
            <NavLink
              to="/festivals"
              onClick={() =>
                scrollToRef(0, scrollTarget.current.offsetHeight - 65)
              }
            >
              {translatedText.general.festivals}
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
