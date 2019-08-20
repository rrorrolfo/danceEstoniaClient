import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator } from 'draft-js';
import { Container } from 'react-bootstrap';
import EditInterface from './EditInterface';
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

  const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    }, callback);
  };

  const Link = props => {
    const { children, contentState, entityKey } = props;
    const { url } = contentState.getEntity(entityKey).getData();
    return (
      <a href={url} className="custom-link">
        {children}
      </a>
    );
  };

  const createLinkEntity = target => {
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: target }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
      decorator
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
  };

  return (
    <React.Fragment>
      <Container>
        <EditInterface
          toggleBold={toggleBold}
          toggleUnderline={toggleUnderline}
          toggleItalic={toggleItalic}
          createLinkEntity={createLinkEntity}
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
