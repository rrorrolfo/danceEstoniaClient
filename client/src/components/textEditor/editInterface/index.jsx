import React from 'react';
import { Container, Button } from 'react-bootstrap';

const EditInterface = ({
  toggleBold,
  toggleItalic,
  toggleUnderline,
  createLinkEntity,
  blockType,
  toggleBlockType
}) => {
  const BLOCK_TYPES = [
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' }
  ];

  return (
    <Container fluid className="edit-interface">
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
        style={{ textDecoration: 'underline', marginRight: '15px' }}
      >
        U
      </Button>
      <Button
        variant="outline-secondary"
        onClick={createLinkEntity}
        style={{ textDecoration: 'underline', marginRight: '15px' }}
      >
        Link
      </Button>
      {BLOCK_TYPES.map(type => (
        <Button
          variant="outline-secondary"
          key={type.label}
          active={type.style === blockType}
          onClick={() => toggleBlockType(type.style)}
        >
          {type.label}
        </Button>
      ))}
    </Container>
  );
};

export default EditInterface;
