import axios from 'axios';
import * as eventsActionTypes from '../actionTypes/events';

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

export const fetchEvents = () => {
  return dispatch => {
    dispatch(fetchedStarted());

    axios
      .get('http://localhost:5000/events')
      .then(response => {
        const events = response.data;
        dispatch(fetchedSuccess(events));
      })
      .catch(error => dispatch(fetchedFailure(error)));
  };
};
