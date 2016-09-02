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



        post('/api/authentication',{},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params:loginstate
        }).then((response)=>{
            dispatch(loginSuccess(targetPath));
        }).catch((error)=>{
            dispatch(loginFailed());
            dispatch(healthchecks.ping());
        });

    }
};

export let loginSuccess= (targetPath,fromRefresh)=>{


    return dispatch => {


        get('/api/account').then((response)=>{
            // refresh CSRF
            dispatch(healthchecks.ping());

            let account = response.data;

            dispatch(accountReceived(account,fromRefresh));

            //if(isInRole('ROLE_ADMIN',account.roles) && !fromRefresh)
            //    dispatch(routerActions.push("/admin"));
            //else
                dispatch(routerActions.push(targetPath));

            localStorage.setItem("login",btoa(response.data.login))



        }).catch((error)=>{
            localStorage.removeItem("login");
            // refresh CSRF
            dispatch(healthchecks.ping());
            if(targetPath)
                dispatch(routerActions.push("/login?targetPath="+targetPath)); // go back to login
            else{
                dispatch(routerActions.push("/login"));
            }
        });

    };

};

export let accountReceived = (account,fromRefresh)=>{

    Progress.hide();
    return {
        type: types.AUTH_ACCOUNTRECIEVE,
        account:account,
        fromRefresh:fromRefresh
    }
};

export let loginFailed = ()=>{
    Progress.hide();
    return {
        type: types.AUTH_LOGIN_FAILED
    }
};



export let logout= ()=>{

    return dispatch => {
        post('/api/logout',{},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response)=>{
            localStorage.removeItem("login");
            dispatch(routerActions.push("/login"));
            dispatch(logoutSuccess());
            dispatch(healthchecks.ping());
        }).catch((error)=>{
            localStorage.removeItem("login");
            dispatch(logoutSuccess());
            dispatch(routerActions.push("/login"));
            dispatch(healthchecks.ping());
        });

    }
};



export let logoutSuccess= ()=>{

    return {
        type: types.AUTH_LOGOUT_SUCCESS
    }

};


export let updateUser= (user)=>{
    return dispatch => {
        dispatch(updateUserStart());


        post('/api/account',user).then((response)=>{
            dispatch(updateUserSuccess(response.data));
            //dispatch(dialogactions.addNotification('Success','Record Save Successfully','success','bl'));
            dispatch(dialogactions.openAlert("Record save successfully",'Success','success'));
        }).catch((error)=>{
            dispatch(dialogactions.openAlert("Failed to update record",'Failure'));
            dispatch(updateUserSuccess());
        });

    }
};

export let updateUserStart= ()=>{

    return {
        type: types.AUTH_UPDATEUSERSTART
    }

};

export let updateUserSuccess= ()=>{

    return {
        type: types.AUTH_UPDATEUSERFINISHED
    }

};


export let changePassword=(oldpassword,password)=>{
    return dispatch=>{
        RestClient.open({
                method: 'POST',
                path: '/api/account/change_password',
                params:{
                    oldpassword,
                    password
                }
            }
        ).then((response)=>{
                dispatch(dialogactions.openAlert("Password changed successfully",'Success','success'));
            },(errorResponse)=>{

                dispatch(dialogactions.openAlert(errorResponse.entity ||
                    "Failed to update password",'Failure','warning'));
            });

    }
};


