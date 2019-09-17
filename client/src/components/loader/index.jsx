import React from 'react';
import PropTypes from 'prop-types';
import { danceEstoniaBl } from '../../assets/icons/Logos';

const Loader = ({ text }) => {
  return (
    <div className="main-loader">
      <div className="loader-logo-container centered">
        <h2 className="teaser">{text}</h2>
        <h4 className="loading">Loading...</h4>
        <div className="centered">
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
