/**
* Created by albertoclarit on 1/13/16.
*/
import * as types from '../constants/modalTypes';
import { routerActions } from 'react-router-redux';

export let open = ({showModal,colorType, modalTitle, modalBody, cancelFunction, cancel, proceed})=>{
  return {
    type: types.MODAL_OPEN,
    modal:{showModal,colorType, modalTitle, modalBody, cancelFunction, cancel, proceed}
  }
};

export let close = ({showModal})=>{
  return {
    type: types.MODAL_CLOSE,
    modal:{showModal}
  }
};
