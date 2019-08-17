import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Footer from '../footer';
import './notFound.css';

const NotFound = ({ history }) => {
  const { errorStatus } = history.location.state || 404;
  return (
    <React.Fragment>
      <Container className="not-found-container centered full-vh-height">
        <h2>{errorStatus === undefined ? 404 : errorStatus}</h2>
        <h2>
          {errorStatus === 404 || errorStatus === undefined
            ? 'Oops! We couldn´t find the page you are looking for...'
            : 'Oops! something went wrong!'}
        </h2>
        <Container>
          <ul className="back-to-nav">
            <li className="category-cta">
              <NavLink to="/events">Back to parties & events</NavLink>
            </li>
            <li className="category-cta">
              <NavLink to="/festivals">Back to festivals</NavLink>
            </li>
          </ul>
        </Container>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

NotFound.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object
};

NotFound.defaultProps = {
  history: {
    location: {
      state: { errorStatus: 500 }
    }
  }
};

export default NotFound;
