import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Proptypes from 'prop-types';
import { firstLetterToUppercase } from '../../utils';

const Breadcrumbs = ({ category, dancingStyle, eventName }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active>
        <NavLink to={`/${category}`}>
          {firstLetterToUppercase(category)}
        </NavLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>
        <NavLink to={`/${category}/${dancingStyle}`}>
          {firstLetterToUppercase(dancingStyle)}
        </NavLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{eventName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  category: Proptypes.oneOf(['events', 'festivals']).isRequired,
  dancingStyle: Proptypes.string.isRequired,
  eventName: Proptypes.string.isRequired
};

export default Breadcrumbs;
