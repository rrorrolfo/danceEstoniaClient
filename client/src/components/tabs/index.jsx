import React from 'react';
import Nav from 'react-bootstrap/Nav';

const NavigationTabs = () => {
  return (
    <Nav fill justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">All</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Salsa</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Bachata</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Kizomba</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavigationTabs;
