import * as configActionTypes from '../actionTypes/config';

// eslint-disable-next-line import/prefer-default-export
export const setLanguage = selectedLanguage => {
  return {
    type: configActionTypes.SET_LANGUAGE,
    selectedLanguage
  };
};
