import axios from 'axios';

/**
 * @param object.isRequired params Contains the parameters that will be sent in the request
 * @param string.isRequired params.endPoint Determines the endpoint to send the request
 * @param string params.timeFrame.oneOf(["week", "month"]) Will return results grouped in the selected filter
 * @param number params.delete.oneOf([0, 1]) 1 will return past events from yesterday´s date, 0 will return future events starting from today´s date
 * @param number params.unauthorized.oneOf([0, 1]) 1 will return unauthorized events, 0 will return authorized events
 * @param number params.all.oneOf([0, 1]) 1 will return authorized and unauthorized events, 0 will return authorized events
 */
export const apiRequest = params => {
  return axios(`http://localhost:5000${params.endPoint}`, {
    params: {
      timeFrame: params.timeFrame,
      delete: params.delete,
      unauthorized: params.unauthorized,
      all: params.all
    }
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
