import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import healthchecks from './healthchecks';
import authreducers from './authreducers'


const rootReducer = combineReducers({
  routing,
  healthchecks,
  auth:authreducers
});

export default rootReducer;
