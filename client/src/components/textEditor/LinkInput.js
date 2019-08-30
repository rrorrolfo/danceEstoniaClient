import React, { useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UrlInput = ({
  editorState,
  setEditorState,
  toggleShowURLInput,
  urlValue,
  updateUrlValue,
  confirmLink,
  focusEditor
}) => {
  const linkInput = React.useRef(null);
  const focusLinkInput = () => linkInput.current.focus();

  useEffect(() => {
    focusLinkInput();
  }, []);

  return (
    <InputGroup className="mb-3" style={{ marginTop: '15px', width: '400px' }}>
      <FormControl
        placeholder="Enter a url and click confirm"
        aria-label="Link creation input"
        onChange={event => updateUrlValue(event.target.value)}
        ref={linkInput}
        type="text"
        value={urlValue}
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          onClick={() => {
            confirmLink(
              editorState,
              urlValue,
              updateUrlValue,
              setEditorState,
              toggleShowURLInput
            );
            setTimeout(() => focusEditor(), 0);
          }}
        >
          Confirm
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

UrlInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  editorState: PropTypes.object,
  setEditorState: PropTypes.func,
  toggleShowURLInput: PropTypes.func,
  urlValue: PropTypes.string,
  updateUrlValue: PropTypes.func,
  confirmLink: PropTypes.func,
  focusEditor: PropTypes.func
};

UrlInput.defaultProps = {
  editorState: null,
  setEditorState: null,
  toggleShowURLInput: null,
  urlValue: '',
  updateUrlValue: null,
  confirmLink: null,
  focusEditor: null
};

export default UrlInput;
