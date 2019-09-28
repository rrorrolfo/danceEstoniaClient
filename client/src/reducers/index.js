import { combineReducers } from 'redux';
import eventsReducer from './events';
import festivalsReducer from './festivals';
import configReducer from './config';

export default combineReducers({
  events: eventsReducer,
  festivals: festivalsReducer,
  config: configReducer
});
