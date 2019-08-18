import axios from 'axios';

/**
 * @param object params Contains the parameters that will be sent in the request
 */
export const apiRequest = params => {
  return axios(`http://localhost:5000${params.endPoint}`, {
    params: { timeFrame: params.timeFrame, delete: params.delete }
  }).then(response => response.data);
};

/**
 * @param string eventType Type of event that will be created, one of "events", "festivals"
 * @param object data Data to be used to create the event or festival
 */
export const createEvent = (eventType, data) => {
  return axios({
    url: `http://localhost:5000/${eventType}`,
    method: 'post',
    data
  })
    .then(response => response.status)
    .catch(error => error.response.data.error);
};

/**
 * @param object params Contains the parameters that will be sent in the request
 */
export const deleteRequest = params => {
  return axios({
    url: `http://localhost:5000${params.endPoint}`,
    method: 'delete'
  })
    .then(response => response.data)
    .catch(error => {
      console.log(error.response.data.error);
      return 'There was an error while requesting a deletion';
    });
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
