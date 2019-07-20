import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from '../footer';
import './notFound.css';

const NotFound = () => {
  return (
    <React.Fragment>
      <Container className="not-found-container centered full-vh-height">
        <h2>404</h2>
        <h2>Oops! We couldn´t find the page you are looking for...</h2>
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

export default NotFound;
