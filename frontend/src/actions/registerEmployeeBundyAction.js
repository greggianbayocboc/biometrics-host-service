
import * as types from '../constants/registerEmployeeTypes';
import {post,get} from '~/src/utils/RestClient';
import { routerActions } from 'react-router-redux'
import * as  healthchecks from './healthchecks';
import Progress from "react-progress-2";

export let beforRegister = ()=>{
    return{
        type: types.REGISTER_EMP_START
    }
};

export let registerEmployee= (loginstate,targetPath)=>{
    Progress.show();
    return dispatch => {
        post('/api/bundyclock/addnewmeployee',{},{
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
        type: types.REGISTER_SUCCESS,
    }
};

export let registerFailed = (message)=>{
    Progress.hide();
    return {
        type: types.REGISTER_FAILED,
        message: message.toUpperCase()
    }
};

