import * as types from '../constants/BundyClockCommands';
import {post, get, _delete} from '~/src/utils/RestClient';

export let getEmployeeActions = () =>{

  return dispatch =>{
    get('api/bundyclock/getusers').then((response) =>{

      var records = response.data;

      dispatch(getEmployeeActionsSuccess(records));

    });
  };
}

export let deleteEmployeeActions =(enrollno)=>{
  return dispatch => {
    _delete('api/bundyclock/deleteuser?enrollno=' + enrollno).then((response) => {
          var records =response.data;

          dispatch(getEmployeeActions());
    });

  };
}

export let getEmployeeActionsSuccess=(records)=>{

  return {
    type:types.LOAD_EMPLOYEE,
    records
  }

}
