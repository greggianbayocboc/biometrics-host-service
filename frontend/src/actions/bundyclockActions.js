import * as types from '../constants/BundyClockCommands';
import {post,get} from '~/src/utils/RestClient';
import { routerActions } from 'react-router-redux'
import Progress from "react-progress-2";


export let loadBundyclockLogs= ()=>{

  return dispatch => {

     get('/api/bundyclock/getlogs').then((response)=>{

       var records = response.data;

       dispatch(loadBundyclockLogsSuccess(records));

     });


  };
};

export let loadBundyclockLogsSuccess = (records)=>{

 return {
  type:types.LOAD_LOGS,
  records:records
 }

};