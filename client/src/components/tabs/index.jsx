import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavigationTabs = ({
  category,
  fetchEvents,
  fetchFestivalsByStyle,
  fetchFestivals
}) => {
  const fetchNewResults = (cat, style = '') => {
    if (category === 'events') {
      fetchEvents(`/${cat}/${style}`);
    } else if (category === 'festivals') {
      if (style) {
        return fetchFestivalsByStyle(`/${cat}/${style}`);
      }
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
  fetchEvents: PropTypes.func.isRequired,
  fetchFestivals: PropTypes.func.isRequired,
  fetchFestivalsByStyle: PropTypes.func.isRequired
};

export default NavigationTabs;
