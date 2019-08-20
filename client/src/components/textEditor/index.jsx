import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Container } from 'react-bootstrap';
import EditInterface from './editInterface';
import '../../../node_modules/draft-js/dist/Draft.css';

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

  return (
    <Container
      style={{ height: '350px', border: '1px solid grey', cursor: 'text' }}
    >
      <EditInterface
        toggleBold={toggleBold}
        toggleUnderline={toggleUnderline}
        toggleItalic={toggleItalic}
      />
      <Editor editorState={editorState} onChange={setEditorState} />;
    </Container>
  );
};

export default TextEditor;
