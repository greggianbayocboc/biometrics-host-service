import * as types from '../constants/ProfileActionTypes';
import {post,get} from '~/src/utils/RestClient';
import { routerActions } from 'react-router-redux'
import Progress from "react-progress-2";

export let loadBundyclockLogsById= (enrollno, name)=>{

  return dispatch => {

     get('/api/bundyclock/getlogsbyenrollnov2?enrollno=' + enrollno).then((response)=>{

       var records = response.data;

       dispatch(loadBundyclockLogsSuccess(records, name));

     });


  };
};

export let loadBundyclockLogsSuccess = (records, name)=>{

 return {
  type:types.LOAD_PROFILE,
  records:records,
  name:name
 }

};
