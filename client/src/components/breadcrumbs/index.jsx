import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firstLetterToUppercase } from '../../utils';

const Breadcrumbs = ({ category, dancingStyle, eventName, translatedText }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active>
        <NavLink
          to={`/${
            category === 'events'
              ? translatedText.general.events
              : translatedText.general.festivals
          }`}
        >
          {firstLetterToUppercase(
            category === 'events'
              ? translatedText.general.events
              : translatedText.general.festivals
          )}
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
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  dancingStyle: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  translatedText: PropTypes.object
};

Breadcrumbs.defaultProps = {
  translatedText: {}
};

export default Breadcrumbs;
