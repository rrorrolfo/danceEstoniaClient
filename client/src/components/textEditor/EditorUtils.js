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

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

export const promptForLink = (selection, state, displayButton, updateUrl) => {
  if (!selection.isCollapsed()) {
    const contentState = state.getCurrentContent();
    const startKey = state.getSelection().getStartKey();
    const startOffset = state.getSelection().getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    let url = '';
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      // eslint-disable-next-line prefer-destructuring
      url = linkInstance.getData().url;
    }

    displayButton(true);
    updateUrl(url);
    /* () => {
      setTimeout(() => this.refs.url.focus(), 0);
    } */
  }
};

export const confirmLink = (
  state,
  url,
  updateUrl,
  updateState,
  displayButton
) => {
  const contentState = state.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
    url
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(state, {
    currentContent: contentStateWithEntity,
    decorator
  });

  updateState(
    RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    )
  );
  displayButton(false);
  updateUrl('');
  /* () => {
    setTimeout(() => this.refs.editor.focus(), 0);
  } */
};

export const removeLinkEntity = (state, selection, callback) => {
  const entitySelection = state.getSelection();
  if (!entitySelection.isCollapsed()) {
    callback(RichUtils.toggleLink(state, selection, null));
  }
};
