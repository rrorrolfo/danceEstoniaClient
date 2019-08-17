import * as eventsActionTypes from '../actionTypes/events';
import { apiRequest } from '../requests/requests';

export const fetchedStarted = () => {
  return {
    type: eventsActionTypes.FETCH_STARTED
  };
};

export const fetchedSuccess = events => {
  return {
    type: eventsActionTypes.FETCH_SUCCESS,
    events
  };
};

export const fetchedFailure = errors => {
  return {
    type: eventsActionTypes.FETCH_FAILURE,
    errors
  };
};

export const resetErrors = () => {
  return {
    type: eventsActionTypes.RESET_ERRORS
  };
};

export const fetchEvents = (endPoint = '/events', timeFrame = 'week') => {
  return dispatch => {
    dispatch(fetchedStarted());

    apiRequest({
      method: 'GET',
      endPoint,
      timeFrame
    })
      .then(events => dispatch(fetchedSuccess(events)))
      .catch(error => dispatch(fetchedFailure(error)));
  };
};

export const fetchEventsByStyleSuccess = (events, style) => {
  return {
    type: eventsActionTypes.FETCH_EVENTS_BY_STYLE_SUCCESS,
    events,
    style
  };
};

export const fetchEventsByStyle = (endPoint, timeFrame = 'week', style) => {
  return dispatch => {
    dispatch(fetchedStarted());

    apiRequest({
      method: 'GET',
      endPoint,
      timeFrame
    })
      .then(events => dispatch(fetchEventsByStyleSuccess(events, style)))
      .catch(error => dispatch(fetchedFailure(error)));
  };
};

export const fetchSingleEventSuccess = event => {
  return {
    type: eventsActionTypes.FETCH_SINGLE_EVENT_SUCCESS,
    event
  };
};

export const fetchSingleEvent = endPoint => {
  return dispatch => {
    dispatch(fetchedStarted());

    apiRequest({
      method: 'GET',
      endPoint
    })
      .then(event => dispatch(fetchSingleEventSuccess(event)))
      .catch(error => dispatch(fetchedFailure(error.response)));
  };
};
