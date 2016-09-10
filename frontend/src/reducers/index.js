import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import healthchecks from './healthchecks';
import authreducers from './authreducers'
import bundyClockReducers from './bundyClockReducers'
import profileReducers from './profileReducers'
import registerReducers from './registerReducers'
import employeeReducers from './employeeReducers'

const rootReducer = combineReducers({
  routing,
  healthchecks,
  auth:authreducers,
  bundyclock:bundyClockReducers,
  profile:profileReducers,
  register:registerReducers,
  employee: employeeReducers
});

export default rootReducer;
