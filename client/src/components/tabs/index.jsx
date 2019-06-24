import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavigationTabs = ({ category, fetchEvents, fetchFestivals }) => {
  const fetchNewResults = (cat, style = '') => {
    if (category === 'events') {
      fetchEvents(`/${cat}/${style}`);
    } else if (category === 'festivals') {
      fetchFestivals(`/${cat}/${style}`);
    }
  };
  return (
    <Nav fill justify variant="tabs" defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <NavLink to={`/${category}`} onClick={() => fetchNewResults(category)}>
          All
        </NavLink>
      </Nav.Item>
      <Nav.Item as="li">
        <NavLink
          to={`/${category}/salsa`}
          onClick={() => fetchNewResults(category, 'salsa')}
        >
          Salsa
        </NavLink>
      </Nav.Item>
      <Nav.Item as="li">
        <NavLink
          to={`/${category}/bachata`}
          onClick={() => fetchNewResults(category, 'bachata')}
        >
          Bachata
        </NavLink>
      </Nav.Item>
      <Nav.Item as="li">
        <NavLink
          to={`/${category}/kizomba`}
          onClick={() => fetchNewResults(category, 'kizomba')}
        >
          Kizomba
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

NavigationTabs.propTypes = {
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  fetchEvents: PropTypes.func,
  fetchFestivals: PropTypes.func
};

NavigationTabs.defaultProps = {
  fetchEvents: null,
  fetchFestivals: null
};

export default NavigationTabs;
