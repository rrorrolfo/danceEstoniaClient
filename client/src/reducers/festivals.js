import * as festivalsActionTypes from '../actionTypes/festivals';

const initialState = {
  festivals: [],
  fetching: false,
  errors: null
};

const festivalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case festivalsActionTypes.FETCH_STARTED:
      return {
        ...state,
        fetching: true
      };

    case festivalsActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        festivals: action.festivals
      };

    case festivalsActionTypes.FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.errors
      };

    default:
      return state;
  }
};

export default festivalsReducer;
