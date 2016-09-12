export * as types from '../constants/DialogsActionTypes';



export let openClose=(data)=>{

    return{
        type: types.SHOW_MODAL,
        data
    }
}


export let close=()=>{

    return{
        type: types.HIDE_MODAL,
        close: true
    }
}