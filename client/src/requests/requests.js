import axios from 'axios';

/**
 * @param object params Contains the parameters that will be sent in the request
 */
export const apiRequest = params => {
  return axios(`http://localhost:5000${params.endPoint}`, {
    ...params
  }).then(response => response.data);
};

const requestOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};
/**
 * @param object data Email body data
 */
export const emailRequest = data => {
  return axios
    .post(
      'https://node-mailer-rcph.herokuapp.com/contact',
      data,
      requestOptions
    )
    .then(response => response.data);
};
