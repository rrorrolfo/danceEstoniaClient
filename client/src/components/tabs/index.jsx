import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './tabs.css';

const NavigationTabs = ({ category }) => {
  return (
    <Nav justify variant="tabs" as="ul" className="navigation-tabs">
      <Nav.Item as="li" className="tab-link">
        <NavLink exact to={`/${category}`}>
          All
        </NavLink>
      </Nav.Item>
      <Nav.Item as="li" className="tab-link">
        <NavLink to={`/${category}/salsa`}>Salsa</NavLink>
      </Nav.Item>
      <Nav.Item as="li" className="tab-link">
        <NavLink to={`/${category}/bachata`}>Bachata</NavLink>
      </Nav.Item>
      <Nav.Item as="li" className="tab-link">
        <NavLink to={`/${category}/kizomba`}>Kizomba</NavLink>
      </Nav.Item>
    </Nav>
  );
};

NavigationTabs.propTypes = {
  category: PropTypes.oneOf(['events', 'festivals']).isRequired
};

export default NavigationTabs;
