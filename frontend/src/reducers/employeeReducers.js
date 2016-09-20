import  * as types from '../constants/BundyClockCommands';
import  update from 'react-addons-update';

export default function employeeReducers(state={
  records:[],
  logs:[]
}, action={}) {


  switch(action.type){

    case types.LOAD_EMPLOYEE:
      return update(state,{
        records:{
          $set:action.records
        },
        logs:{
          $set:action.logs
        }
      });




    default: return state;
  }


}
