import * as types from '../constants/BundyClockCommands';
import {post, get, _delete} from '~/src/utils/RestClient';
import Promise from 'bluebird';

// export let getEmployeeActionsWithLogs = () =>{
//   return dispatch =>{
//       Promise.coroutine(function* (){
//         var user = yield get('api/bundyclock/getuser');
//         var logs = yield get('/api/bundyclock/getlogsbyenrollno?enrollno=' + user.dwEnrollNumber);
//         console.log(logs.json());
//
//       });
//   }
// }

export let getEmployeeActions = () =>{

  return dispatch =>{
    get('api/bundyclock/getusers').then((response) =>{
      var records = response.data;
      get('api/bundyclock/getlogsbydate').then((response) =>{
        var logs = response.data;

        dispatch(getEmployeeActionsSuccess(records, logs));

      });

    });
  }
}

export let deleteEmployeeActions =(enrollno)=>{
  return dispatch => {
    _delete('api/bundyclock/deleteuser?enrollno=' + enrollno).then((response) => {
          var records =response.data;

          dispatch(getEmployeeActions());
    });

  };
}

export let getEmployeeActionsSuccess=(records, logs)=>{

  return {
    type:types.LOAD_EMPLOYEE,
    records:records,
    logs:logs
  }

}
