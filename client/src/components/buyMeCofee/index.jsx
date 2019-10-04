import React from 'react';
import PropTypes from 'prop-types';
import './buyMeCofee.css';

const BuyMeCofeeCTA = ({ customClass }) => {
  return (
    <>
      <a
        className={`bmc-button ${customClass}`}
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.buymeacoffee.com/qDN7sWBi5"
      >
        <img
          src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
          alt="Buy me a coffee"
        />
        <span style={{ marginLeft: '5px' }}>Buy me a coffee</span>
        <span
          className="support-text"
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '45px',
            width: '90px',
            color: '#0072ce'
          }}
        >
          Support us
        </span>
      </a>
    </>
  );
};

BuyMeCofeeCTA.propTypes = {
  customClass: PropTypes.string.isRequired
};

export default BuyMeCofeeCTA;
