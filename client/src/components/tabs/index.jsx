import React from 'react';
import Nav from 'react-bootstrap/Nav';

const NavigationTabs = ({ category }) => {
  return (
    <Nav fill justify variant="tabs" defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href={`/${category}`}>All</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href={`/${category}/salsa`}>Salsa</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href={`/${category}/bachata`}>Bachata</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href={`/${category}/kizomba`}>Kizomba</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavigationTabs;
