import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './header.css';

const Header = React.memo(() => (
  <Navbar expand="md" variant="dark" fixed="top">
    <Navbar.Brand href="/">DanceEstonia</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title="Events" id="basic-nav-dropdown">
          <NavDropdown.Item href="#">All</NavDropdown.Item>
          <NavDropdown.Item href="#">Salsa</NavDropdown.Item>
          <NavDropdown.Item href="#">Bachata</NavDropdown.Item>
          <NavDropdown.Item href="#">Kizomba</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Festivals" id="basic-nav-dropdown">
          <NavDropdown.Item href="#">All</NavDropdown.Item>
          <NavDropdown.Item href="#">Salsa</NavDropdown.Item>
          <NavDropdown.Item href="#">Bachata</NavDropdown.Item>
          <NavDropdown.Item href="#">Kizomba</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#">Shop</Nav.Link>
        <Nav.Link href="#">Store</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
));

export default Header;
