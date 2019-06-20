import * as festivalsActionTypes from '../actionTypes/festivals';
import apiRequest from '../requests/requests';

export const fetchedStarted = () => {
  return {
    type: festivalsActionTypes.FETCH_STARTED
  };
};

export const fetchedSuccess = festivals => {
  return {
    type: festivalsActionTypes.FETCH_SUCCESS,
    festivals
  };
};

export const fetchedFailure = errors => {
  return {
    type: festivalsActionTypes.FETCH_FAILURE,
    errors
  };
};

export const fetchFestivals = (endPoint = '/festivals') => {
  return dispatch => {
    dispatch(fetchedStarted());

    apiRequest({
      method: 'GET',
      endPoint
    })
      .then(festivals => dispatch(fetchedSuccess(festivals)))
      .catch(error => dispatch(fetchedFailure(error)));
  };
};
