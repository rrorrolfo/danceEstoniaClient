import axios from 'axios';
import * as festivalsActionTypes from '../actionTypes/festivals';

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

export const fetchFestivals = () => {
  return dispatch => {
    dispatch(fetchedStarted());

    axios
      .get('http://localhost:5000/festivals')
      .then(response => {
        const festivals = response.data;
        dispatch(fetchedSuccess(festivals));
      })
      .catch(error => dispatch(fetchedFailure(error)));
  };
};
