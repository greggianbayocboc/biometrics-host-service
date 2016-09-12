import * as types from '../constants/DialogsActionTypes';
import  update from 'react-addons-update';
export default function modalReducers(state={
    data: null
},action={}){
    switch(action.type){
        case types.SHOW_MODAL:
            return update(state, {
               data: action.data
            });
        case types.HIDE_MODAL:
            return update(state, {
                close: action.close
            });

        default: return state;
    }
}