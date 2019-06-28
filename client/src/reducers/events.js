import * as eventsActionTypes from '../actionTypes/events';

const initialState = {
  events: [],
  eventsByStyle: [],
  singleEvent: null,
  fetching: false,
  errors: null
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

    case eventsActionTypes.FETCH_EVENTS_BY_STYLE_SUCCESS:
      return {
        ...state,
        fetching: false,
        eventsByStyle: action.events
      };

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

    default:
      return state;
  }
};

export default eventsReducer;
