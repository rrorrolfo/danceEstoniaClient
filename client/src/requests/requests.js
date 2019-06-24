import axios from 'axios';

/**
 * @param object params Contains the parameters that will be sent in the request
 */
const apiRequest = async params => {
  return axios(`http://localhost:5000${params.endPoint}`, {
    ...params
  }).then(response => response.data);
};

export default apiRequest;
