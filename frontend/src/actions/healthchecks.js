/**
 * Created by albertoclarit on 1/10/16.
 */
import * as types from '../constants/HealthCheckTypes';
import {get} from '~/src/utils/RestClient';

export let ping=()=>{

    return dispatch=>{

        get('/api/public/ping').then((response)=>{
            if(response.data.success)
            dispatch(pingSuccess());
            else
            dispatch(pingError());
        }).catch(function (error) {
            dispatch(pingError());
        });

    }
}

export let pingSuccess= ()=> {
    return { type: types.HC_PINGSUCCESS }
}

export let pingError=()=> {
    return { type: types.HC_PINGERROR }
}

export let getFrontendVersion=()=> {
    return { type: types.HC_GETFRONTENDVER }
}


