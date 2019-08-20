import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { Container } from 'react-bootstrap';
import EditInterface from './editInterface';
import '../../../node_modules/draft-js/dist/Draft.css';
import './textEditor.css';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

  /* const createLinkEntity = (url = 'http://google.com') => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url }
    );
    const selectionState = editorState.getSelection();
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithLink = Modifier.applyEntity(
      contentStateWithEntity,
      selectionState,
      entityKey
    );
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithLink
    });
  }; */

  return (
    <React.Fragment>
      <Container>
        <EditInterface
          toggleBold={toggleBold}
          toggleUnderline={toggleUnderline}
          toggleItalic={toggleItalic}
          // createLinkEntity={createLinkEntity}
          selection={selection}
          blockType={blockType}
          toggleBlockType={toggleBlockType}
        />
      </Container>
      <Container className="text-editor-container">
        <Editor editorState={editorState} onChange={setEditorState} />;
      </Container>
    </React.Fragment>
  );
};

export default TextEditor;
