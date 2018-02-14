import  * as types from '../constants/RegisterTypes';
import  update from 'react-addons-update';

export default function registerReducers(state={
  message:null
}, action={}) {

  switch(action.type){
    case types.REGISTRATION_START:
    return update(state,{
      message:{
        $set:null
      },
    });

    case types.REGISTRATION_SUCCESS:
    return update(state,{
      message:{
        $set:null
      },
    });

    case types.REGISTRATION_FAILED:
    return update(state,{
      message:{
        $set:action.message
      },
    });

    default: return state;
  }
}
