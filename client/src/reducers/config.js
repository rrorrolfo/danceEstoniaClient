import * as configActionTypes from '../actionTypes/config';

const initialState = {
  lang: 'est'
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case configActionTypes.SET_LANGUAGE:
      return { ...initialState, lang: action.selectedLanguage };
    default:
      return state;
  }
};

export default configReducer;
