import * as festivalsActionTypes from '../actionTypes/festivals';

const initialState = {
  festivals: [],
  festivalsByStyle: { salsa: [], bachata: [], kizomba: [] },
  singleFestival: null,
  fetching: false,
  errors: { status: 0 }
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

    case festivalsActionTypes.FETCH_FESTIVALS_BY_STYLE_SUCCESS: {
      let selectedStyleFestivals = {};
      switch (action.style) {
        case 'salsa':
          selectedStyleFestivals = { salsa: action.festivals };
          break;
        case 'bachata':
          selectedStyleFestivals = { bachata: action.festivals };
          break;
        case 'kizomba':
          selectedStyleFestivals = { kizomba: action.festivals };
          break;
        default:
          return selectedStyleFestivals;
      }
      return {
        ...state,
        fetching: false,
        festivalsByStyle: {
          ...state.festivalsByStyle,
          ...selectedStyleFestivals
        }
      };
    }

    case festivalsActionTypes.FETCH_SINGLE_FESTIVAL_SUCCESS:
      return {
        ...state,
        fetching: false,
        singleFestival: action.festival
      };

    case festivalsActionTypes.FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.errors
      };

    case festivalsActionTypes.RESET_ERRORS:
      return {
        ...state,
        errors: { status: 0 }
      };

    default:
      return state;
  }
};

export default festivalsReducer;
