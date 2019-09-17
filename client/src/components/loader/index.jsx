import React from 'react';
import PropTypes from 'prop-types';
import { danceEstoniaBl } from '../../assets/icons/Logos';

const Loader = ({ text }) => {
  return (
    <div className="main-loader">
      <div className="loader-logo-container">
        <h2 className="teaser centered">{text}</h2>
        <div>
          {danceEstoniaBl(
            'danceEstoniaBl-container',
            'danceEstoniaBl-logo-group'
          )}
        </div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string.isRequired
};

export default Loader;
