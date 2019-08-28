import React from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EditInterface = ({
  toggleBold,
  toggleItalic,
  toggleUnderline,
  createLinkEntity,
  removeLinkEntity,
  selection,
  blockType,
  toggleBlockType,
  editorState,
  setEditorState
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
        onClick={() =>
          createLinkEntity(editorState, 'http://google.com', setEditorState)
        }
        style={{ textDecoration: 'underline', marginRight: '15px' }}
      >
        Add Link
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => removeLinkEntity(editorState, selection, setEditorState)}
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

EditInterface.propTypes = {
  toggleBold: PropTypes.func,
  toggleItalic: PropTypes.func,
  toggleUnderline: PropTypes.func,
  createLinkEntity: PropTypes.func,
  removeLinkEntity: PropTypes.func,
  blockType: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selection: PropTypes.object.isRequired,
  toggleBlockType: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired
};

EditInterface.defaultProps = {
  toggleBold: null,
  toggleItalic: null,
  toggleUnderline: null,
  createLinkEntity: null,
  removeLinkEntity: null
};

export default EditInterface;
