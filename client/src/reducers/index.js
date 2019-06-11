import { combineReducers } from 'redux';
import eventsReducer from './events';
import festivalsReducer from './festivals';

export default combineReducers({
  events: eventsReducer,
  festivals: festivalsReducer
});
