import React from 'react';
import { Container, Button } from 'react-bootstrap';

const EditInterface = ({ toggleBold, toggleItalic, toggleUnderline }) => {
  return (
    <Container fluid>
      <Button
        variant="outline-secondary"
        onClick={toggleBold}
        style={{ fontWeight: '900' }}
      >
        B
      </Button>
      <Button
        variant="outline-secondary"
        onClick={toggleItalic}
        style={{ fontStyle: 'italic' }}
      >
        I
      </Button>
      <Button
        variant="outline-secondary"
        onClick={toggleUnderline}
        style={{ textDecoration: 'underline' }}
      >
        U
      </Button>
    </Container>
  );
};

export default EditInterface;
