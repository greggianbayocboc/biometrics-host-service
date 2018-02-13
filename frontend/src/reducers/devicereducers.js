import  * as types from '../constants/deviceActionTypes';
import  update from 'react-addons-update';



export default function devicereducers(state={
    device: {
        records: [],
        activeRecord:{},
        pageInfo:{}
    }
}, action={}) {


    switch(action.type){

        case types.LOAD_ALLDEVICES:
            let device = update(state.device,{
                records: {
                    $set: action.data._embedded.devices
                },
                pageInfo:{
                    $set: action.data.page
                }
            })
            return update(state,{
                device:{
                   $set: device
                }
            });


        default: return state;
    }


}
