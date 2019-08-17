import * as eventsActionTypes from '../actionTypes/events';

const initialState = {
  events: [],
  eventsByStyle: { salsa: [], bachata: [], kizomba: [] },
  singleEvent: null,
  fetching: false,
  errors: { status: 0 }
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case eventsActionTypes.FETCH_STARTED:
      return {
        ...state,
        fetching: true
      };

    case eventsActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        events: action.events
      };

    case eventsActionTypes.FETCH_EVENTS_BY_STYLE_SUCCESS: {
      let selectedStyleEvents = {};
      switch (action.style) {
        case 'salsa':
          selectedStyleEvents = { salsa: action.events };
          break;
        case 'bachata':
          selectedStyleEvents = { bachata: action.events };
          break;
        case 'kizomba':
          selectedStyleEvents = { kizomba: action.events };
          break;
        default:
          return selectedStyleEvents;
      }
      return {
        ...state,
        fetching: false,
        eventsByStyle: { ...state.eventsByStyle, ...selectedStyleEvents }
      };
    }

    case eventsActionTypes.FETCH_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        fetching: false,
        singleEvent: action.event
      };

    case eventsActionTypes.FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.errors
      };

    case eventsActionTypes.RESET_ERRORS:
      return {
        ...state,
        errors: { status: 0 }
      };

    default:
      return state;
  }
};

export default eventsReducer;
