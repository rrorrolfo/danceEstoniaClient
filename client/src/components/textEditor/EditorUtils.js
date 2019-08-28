import React from 'react';
import { EditorState, RichUtils, CompositeDecorator } from 'draft-js';

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

export const createLinkEntity = (state, target, callback) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    }
  ]);
  const contentState = state.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
    url: target
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(state, {
    currentContent: contentStateWithEntity,
    decorator
  });
  callback(
    RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    )
  );
};

export const removeLinkEntity = (state, selection, callback) => {
  const entitySelection = state.getSelection();
  if (!entitySelection.isCollapsed()) {
    callback(RichUtils.toggleLink(state, selection, null));
  }
};
