import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Proptypes from 'prop-types';

const Breadcrumbs = ({ category, dancingStyle, eventName }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active>
        <NavLink to={`/${category}`}>{category}</NavLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>
        <NavLink to={`/${category}/${dancingStyle}`}>{dancingStyle}</NavLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{eventName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  category: Proptypes.oneOf(['Events', 'Festivals']).isRequired,
  dancingStyle: Proptypes.string.isRequired,
  eventName: Proptypes.string.isRequired
};

export default Breadcrumbs;
