import  * as types from '../constants/BundyClockCommands';
import  update from 'react-addons-update';

export default function employeeReducers(state={
  records:[]
}, action={}) {


  switch(action.type){

    case types.LOAD_EMPLOYEE:
      return update(state,{
        records:{
          $set:action.records
        }
      });


    default: return state;
  }


}