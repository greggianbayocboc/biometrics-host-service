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
        dispatch(getEmployeeActionsSuccess(records));
    });
  }
}

export let getEmployeeLogs = (enrollno)=>{
  return dispatch =>{
      get('api/bundyclock/getlogsbydate',{
        params:{
            enrollno: enrollno
        }
      }).then((response) =>{

          var logs = response.data;
          dispatch(getEmployeeLogsSuccess(logs))
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

export let getEmployeeLogsSuccess = (logs)=>{

}

export let getEmployeeActionsSuccess=(records)=>{

  return {
    type:types.LOAD_EMPLOYEE,
    records:records
  }

}
