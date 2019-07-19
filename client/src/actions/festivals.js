import * as festivalsActionTypes from '../actionTypes/festivals';
import { apiRequest } from '../requests/requests';

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

export const fetchFestivalsByStyleSuccess = festivals => {
  return {
    type: festivalsActionTypes.FETCH_FESTIVALS_BY_STYLE_SUCCESS,
    festivals
  };
};

export const fetchFestivalsByStyle = endPoint => {
  return dispatch => {
    dispatch(fetchedStarted());

    apiRequest({
      method: 'GET',
      endPoint
    })
      .then(festivals => dispatch(fetchFestivalsByStyleSuccess(festivals)))
      .catch(error => dispatch(fetchedFailure(error)));
  };
};

export const fetchSingleFestivalSuccess = festival => {
  return {
    type: festivalsActionTypes.FETCH_SINGLE_FESTIVAL_SUCCESS,
    festival
  };
};

export const fetchSingleFestival = endPoint => {
  return dispatch => {
    dispatch(fetchedStarted());

    apiRequest({
      method: 'GET',
      endPoint
    })
      .then(festival => dispatch(fetchSingleFestivalSuccess(festival)))
      .catch(error => dispatch(fetchedFailure(error)));
  };
};
