import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { danceEstoniaWt, danceCouple } from '../../assets/icons/Logos';
import './header.css';

const Header = () => {
  const [displayEventsMenu, toggleEventsMenu] = useState(false);
  const [displayFestivalsMenu, toggleFestivalsMenu] = useState(false);
  const checkForShowClass = element => {
    const node = document.querySelector(`.${element}`);
    return setTimeout(() => node.classList.contains('.show'), 100);
  };
  const handleClick = cat => {
    if (cat === 'events') {
      const eventMenu = document.querySelector('.events');
      toggleEventsMenu(false);
      eventMenu.click();
      eventMenu.classList.remove('show');
      document.querySelector('.events .dropdown-menu').classList.remove('show');
      return true;
    }

    const festivalsMenu = document.querySelector('.festivals');
    toggleFestivalsMenu(false);
    festivalsMenu.click();
    festivalsMenu.classList.remove('show');
    document
      .querySelector('.festivals .dropdown-menu')
      .classList.remove('show');
    return true;
  };
  return (
    <Navbar expand="md" variant="dark" fixed="top" className="header-container">
      <Container>
        <Navbar.Brand className="dance-estonia-logo-container">
          <NavLink to="/">
            {danceCouple('dancing-couple-logo', '#fff')}
            {danceEstoniaWt(
              'danceEstoniaWt-container',
              'danceEstoniaWt-logo-group'
            )}
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto main-nav">
            <NavDropdown
              title="Events"
              className="basic-nav-dropdown events"
              onClick={() => toggleEventsMenu(checkForShowClass('events'))}
            >
              <ul
                className="custom-dropdown-menu"
                style={{ display: displayEventsMenu ? 'block' : 'none' }}
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/events"
                    onClick={() => handleClick('events')}
                  >
                    All
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    onClick={() => handleClick('events')}
                    to="/events/salsa"
                  >
                    Salsa
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    onClick={() => handleClick('events')}
                    to="/events/bachata"
                  >
                    Bachata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    onClick={() => handleClick('events')}
                    to="/events/kizomba"
                  >
                    Kizomba
                  </NavLink>
                </li>
              </ul>
            </NavDropdown>
            <NavDropdown
              title="Festivals"
              className="basic-nav-dropdown festivals"
              onClick={() =>
                toggleFestivalsMenu(checkForShowClass('festivals'))
              }
            >
              <ul
                className="custom-dropdown-menu"
                style={{ display: displayFestivalsMenu ? 'block' : 'none' }}
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    onClick={() => handleClick()}
                    to="/festivals"
                  >
                    All
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    onClick={() => handleClick()}
                    to="/festivals/salsa"
                  >
                    Salsa
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    onClick={() => handleClick()}
                    to="/festivals/bachata"
                  >
                    Bachata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    onClick={() => handleClick()}
                    to="/festivals/kizomba"
                  >
                    Kizomba
                  </NavLink>
                </li>
              </ul>
            </NavDropdown>
            {/* <NavLink to="#" className="main-nav-link">
              Shop
            </NavLink> */}
            <NavLink to="/createEvent" className="main-nav-link">
              Create Event
            </NavLink>
            <NavLink to="/contact" className="main-nav-link">
              Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
