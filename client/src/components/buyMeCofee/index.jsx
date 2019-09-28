import React from 'react';
import './buyMeCofee.css';

const BuyMeCofeeCTA = () => {
  return (
    <a
      className="bmc-button"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.buymeacoffee.com/qDN7sWBi5"
    >
      <img
        src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <span style={{ marginLeft: '5px' }}>Buy me a coffee</span>
    </a>
  );
};

export default BuyMeCofeeCTA;
