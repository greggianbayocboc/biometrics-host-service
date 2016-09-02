import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import healthchecks from './healthchecks';
import authreducers from './authreducers'
import bundyClockReducers from './bundyClockReducers'

const rootReducer = combineReducers({
  routing,
  healthchecks,
  auth:authreducers,
  bundyclock:bundyClockReducers
});

export default rootReducer;
