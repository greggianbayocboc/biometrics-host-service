import  * as types from '../constants/BundyClockCommands';
import  update from 'react-addons-update';



export default function bundyClockReducers(state={
    records:[]
}, action={}) {


    switch(action.type){

    case types.LOAD_LOGS:
    return update(state,{
     records:{
         $set:action.records
        }
    });


    default: return state;
    }


}
