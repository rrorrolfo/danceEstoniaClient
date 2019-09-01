/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
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
  const [invalidURL, toggleInvalidUrl] = useState(false);
  const [isValidURL, toggleValidUrl] = useState(false);

  const linkInput = React.useRef(null);
  const focusLinkInput = () => linkInput.current.focus();

  useEffect(() => {
    focusLinkInput();
  }, []);

  /**
   * @param {string} url - name attribute value of the input that will be targeted to be performed the correspondant validation upon.
   */
  const linkUrlSanitizer = url => {
    let finalURL = url;
    // check for "http://"" or "https://""
    const hasProtocol = /^http[s]?:[\/]{2}/i.test(url);
    if (!hasProtocol) {
      finalURL = `http://${url}`;
    }

    // check for url starting with "www."
    const hasWWW = /^http[s]?:[\/]{2}[w]{3}\./i.test(finalURL);
    if (!hasWWW) {
      const urlBeginning = finalURL.indexOf('//');
      finalURL = `${finalURL.slice(0, urlBeginning + 2)}www.${finalURL.slice(
        urlBeginning + 2,
        finalURL.length
      )}`;
    }

    // check for a domain
    const hasDomain = /^http[s]?:[\/]{2}[w]{3}\.\w+\.[a-z]+/i.test(finalURL);
    if (!hasDomain) {
      return toggleInvalidUrl(true);
    }

    toggleValidUrl(true);
    return finalURL;
  };

  return (
    <InputGroup className="mb-3" style={{ marginTop: '15px', width: '400px' }}>
      <Form.Control
        placeholder="Enter a url and click confirm"
        aria-label="Link creation input"
        onChange={event => updateUrlValue(event.target.value)}
        ref={linkInput}
        type="text"
        value={urlValue}
        isInvalid={invalidURL}
        isValid={isValidURL}
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          onClick={() => {
            toggleInvalidUrl(false);
            toggleValidUrl(false);
            const validUrl = linkUrlSanitizer(urlValue);
            if (typeof validUrl === 'string') {
              confirmLink(
                editorState,
                validUrl,
                updateUrlValue,
                setEditorState,
                toggleShowURLInput
              );
              return setTimeout(() => focusEditor(), 0);
            }
            return false;
          }}
        >
          Confirm
        </Button>
      </InputGroup.Append>
      <Form.Control.Feedback type="invalid">
        The format of the url is not correct.
      </Form.Control.Feedback>
      <Form.Control.Feedback type="valid">
        The link has been created!
      </Form.Control.Feedback>
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
