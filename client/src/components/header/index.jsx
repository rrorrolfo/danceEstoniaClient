import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './header.css';

const Header = React.memo(() => (
  <Navbar expand="md" variant="dark" fixed="top">
    <Navbar.Brand href="/">DanceEstonia</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title="Events" className="basic-nav-dropdown">
          <NavDropdown.Item href="/events">All</NavDropdown.Item>
          <NavDropdown.Item href="/events/salsa">Salsa</NavDropdown.Item>
          <NavDropdown.Item href="/events/bachata">Bachata</NavDropdown.Item>
          <NavDropdown.Item href="/events/kizomba">Kizomba</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Festivals" className="basic-nav-dropdown">
          <NavDropdown.Item href="/festivals">All</NavDropdown.Item>
          <NavDropdown.Item href="/festivals/salsa">Salsa</NavDropdown.Item>
          <NavDropdown.Item href="/festivals/bachata">Bachata</NavDropdown.Item>
          <NavDropdown.Item href="/festivals/kizomba">Kizomba</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#">Shop</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
));

export default Header;
