import * as eventsActionTypes from '../actionTypes/events';
import apiRequest from '../requests/requests';

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

export const fetchEvents = (endPoint = '/events') => {
  return dispatch => {
    dispatch(fetchedStarted());

    apiRequest({
      method: 'GET',
      endPoint
    })
      .then(events => dispatch(fetchedSuccess(events)))
      .catch(error => dispatch(fetchedFailure(error)));
  };
};
