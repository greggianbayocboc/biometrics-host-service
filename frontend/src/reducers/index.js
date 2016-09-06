import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import healthchecks from './healthchecks';
import authreducers from './authreducers'
import bundyClockReducers from './bundyClockReducers'
import employeeReducers from './employeeReducers'

const rootReducer = combineReducers({
  routing,
  healthchecks,
  auth:authreducers,
  bundyclock:bundyClockReducers,
  employee: employeeReducers
});

export default rootReducer;
