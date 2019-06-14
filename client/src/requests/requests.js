import axios from 'axios';

/**
 * @param object params Contains the parameters that will be sent in the request
 */
const apiRequest = async params => {
  try {
    return await axios({ ...params }).then(response => response.data);
  } catch (e) {
    return console.log('There was an error while fetching');
  }
};

export default apiRequest;
