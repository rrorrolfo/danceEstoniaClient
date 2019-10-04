import React from 'react';
import PropTypes from 'prop-types';
import { danceCouple } from '../../assets/icons/Logos';

const Loader = ({ text, translatedText }) => {
  return (
    <div className="main-loader">
      <div className="loader-logo-container centered">
        <h2 className="teaser">{text}</h2>
        <h4 className="loading">{`${translatedText.loader.loading}...`}</h4>
        <div className="centered">{danceCouple('dance-couple-loader')}</div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  translatedText: PropTypes.object
};

Loader.defaultProps = {
  translatedText: {}
};

export default Loader;
