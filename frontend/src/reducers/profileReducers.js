import  * as types from '../constants/ProfileActionTypes';
import  update from 'react-addons-update';



export default function profileReducers(state={
    records:{},
    name:null
}, action={}) {


    switch(action.type){

    case types.LOAD_PROFILE:
    return update(state,{
      records:{
        $set:action.records
      },
      name:{$set: action.name}
    });


    default: return state;
    }


}
