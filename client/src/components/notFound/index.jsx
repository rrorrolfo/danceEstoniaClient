import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './notFound.css';

const NotFound = () => {
  return (
    <Container className="not-found-container centered">
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
  );
};

export default NotFound;
