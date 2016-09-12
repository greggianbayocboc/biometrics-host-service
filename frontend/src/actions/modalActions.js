<<<<<<< Updated upstream
export * as types from '../constants/DialogsActionTypes';



export let openClose=(data)=>{

    return{
        type: types.SHOW_MODAL,
        data
    }
}


export let close=()=>{

    return{
        type: types.HIDE_MODAL,
        close: true
    }
}
=======
/**
* Created by albertoclarit on 1/13/16.
*/
import * as types from '../constants/modalTypes';
import { routerActions } from 'react-router-redux';

export let open = ({showModal, size, modalTitle, modalBody, cancelFunction, cancel, proceed})=>{
  return {
    type: types.MODAL_OPEN,
    modal:{showModal, size, modalTitle, modalBody, cancelFunction, cancel, proceed}
  }
};

export let close = ({showModal})=>{
  return {
    type: types.MODAL_CLOSE,
    modal:{showModal}
  }
};
>>>>>>> Stashed changes
