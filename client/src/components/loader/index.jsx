import React from 'react';
import { danceEstoniaBl } from '../../assets/icons/Logos';

const Loader = () => {
  return (
    <div className="main-loader">
      <div className="loader-logo-container">
        <div>
          {danceEstoniaBl(
            'danceEstoniaBl-container',
            'danceEstoniaBl-logo-group'
          )}
        </div>
        <h2 className="teaser centered">Ready to dance?</h2>
      </div>
    </div>
  );
};

export default Loader;
