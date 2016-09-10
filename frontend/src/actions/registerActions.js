/**
 * Created by albertoclarit on 1/13/16.
 */
import * as types from '../constants/AuthActionTypes';
import {post,get} from '~/src/utils/RestClient';
import { routerActions } from 'react-router-redux'
import {isInRole} from '~/src/utils/AuthUtils';
import * as  healthchecks from './healthchecks';
import * as dialogactions from './dialogactions'
import Progress from "react-progress-2";



export let login= (loginstate,targetPath)=>{

    Progress.show();

    return dispatch => {
        post('/api/register',{},{
            headers: {
                'Content-Type': 'application/json',
            },
            data:loginstate
        }).then((response)=>{
            dispatch(console.log(response));
        }).catch((error)=>{
            dispatch(console.log(error));
            dispatch(healthchecks.ping());
        });

    }
};
