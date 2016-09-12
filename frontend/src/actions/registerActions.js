/**
* Created by albertoclarit on 1/13/16.
*/
import * as types from '../constants/RegisterTypes';
import {post,get} from '~/src/utils/RestClient';
import { routerActions } from 'react-router-redux'
import * as  healthchecks from './healthchecks';
import Progress from "react-progress-2";

export let beforeRegister = ()=>{
  return {
    type: types.REGISTRATION_START
  }
};

export let register= (loginstate,targetPath)=>{
  Progress.show();
  return dispatch => {
    post('/api/register',{},{
      headers: {
        'Content-Type': 'application/json',
      },
      data:loginstate
    }).then((response)=>{
      dispatch(registerSuccess());
      dispatch(routerActions.push(targetPath));
    }).catch((error)=>{
      dispatch(registerFailed(error.response.request.response));
      dispatch(healthchecks.ping());
    });

  }
};

export let registerSuccess = ()=>{
  Progress.hide();
  return {
    type: types.REGISTRATION_SUCCESS,
  }
};

export let registerFailed = (message)=>{
  Progress.hide();
  return {
    type: types.REGISTRATION_FAILED,
    message: message.toUpperCase()
  }
};
