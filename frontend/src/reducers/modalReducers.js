import  * as types from '../constants/modalTypes';
import  update from 'react-addons-update';

export default function bundyClockReducers(state={}, action={}) {

  switch(action.type){

    case types.MODAL_OPEN:
    return update(state,{
      $set:action.modal
    });

    case types.MODAL_CLOSE:
    return update(state,{
      $set:action.modal
    });

    default: return state;
  }
}
