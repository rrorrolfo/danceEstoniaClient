import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EditInterface from './EditInterface';
import linkDecorator from './LinkDecorator';
import { createLinkEntity, removeLinkEntity } from './EditorUtils';
import '../../../node_modules/draft-js/dist/Draft.css';
import './textEditor.css';

const TextEditor = ({ rawJson, isEvent, eventDescription }) => {
  const [editorState, setEditorState] = useState(
    isEvent
      ? EditorState.createWithContent(eventDescription, linkDecorator())
      : EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  const focusEditor = () => editor.current.focus();

  useEffect(() => {
    if (!isEvent) {
      focusEditor();
    }
  }, [isEvent]);

  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const toggleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const toggleBlockType = block => {
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  return (
    <React.Fragment>
      {!isEvent ? (
        <Container>
          <EditInterface
            toggleBold={toggleBold}
            toggleUnderline={toggleUnderline}
            toggleItalic={toggleItalic}
            createLinkEntity={createLinkEntity}
            removeLinkEntity={removeLinkEntity}
            selection={selection}
            blockType={blockType}
            toggleBlockType={toggleBlockType}
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </Container>
      ) : null}
      <Container
        className="text-editor-container"
        onClick={!isEvent ? focusEditor : null}
      >
        <Editor
          editorState={editorState}
          onChange={newState => {
            setEditorState(newState);
            rawJson(editorState.getCurrentContent());
          }}
          readOnly={isEvent}
          ref={!isEvent ? editor : null}
        />
      </Container>
    </React.Fragment>
  );
};

TextEditor.propTypes = {
  rawJson: PropTypes.func,
  isEvent: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  eventDescription: PropTypes.object
};

TextEditor.defaultProps = {
  rawJson: null,
  isEvent: false,
  eventDescription: null
};

export default TextEditor;
