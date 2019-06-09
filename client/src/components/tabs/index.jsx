import React from 'react';
import Nav from 'react-bootstrap/Nav';

const NavigationTabs = () => {
  return (
    <Nav fill justify variant="tabs" defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/">All</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/">Salsa</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/">Bachata</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/">Kizomba</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavigationTabs;
