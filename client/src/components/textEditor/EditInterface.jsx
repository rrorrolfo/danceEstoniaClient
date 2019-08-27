import React from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EditInterface = ({
  toggleBold,
  toggleItalic,
  toggleUnderline,
  createLinkEntity,
  removeLinkEntity,
  blockType,
  toggleBlockType
}) => {
  const BLOCK_TYPES = [
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
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
        onClick={() => createLinkEntity('http://google.com')}
        style={{ textDecoration: 'underline', marginRight: '15px' }}
      >
        Add Link
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => removeLinkEntity()}
        style={{ textDecoration: 'underline', marginRight: '15px' }}
      >
        Remove Link
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
