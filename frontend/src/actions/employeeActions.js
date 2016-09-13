import * as types from '../constants/BundyClockCommands';
import {post, get} from '~/src/utils/RestClient';

export let getEmployeeActions = () =>{

  return dispatch =>{
    get('api/bundyclock/getusers').then((response) =>{

      var records = response.data;

      dispatch(getEmployeeActionsSuccess(records));

    });
  };
}

export let getEmployeeActionsSuccess=(records)=>{

  return {
    type:types.LOAD_EMPLOYEE,
    records
  }

}
