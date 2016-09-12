<<<<<<< Updated upstream
import * as types from '../constants/DialogsActionTypes';
import  update from 'react-addons-update';
export default function modalReducers(state={
    data: null
},action={}){
    switch(action.type){
        case types.SHOW_MODAL:
            return update(state, {
               data: action.data
            });
        case types.HIDE_MODAL:
            return update(state, {
                close: action.close
            });

        default: return state;
    }
}
=======
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
>>>>>>> Stashed changes
