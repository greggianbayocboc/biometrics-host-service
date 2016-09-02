/**
 * Created by albertoclarit on 1/10/16.
 */
import  * as actions  from '../constants/HealthCheckTypes';
import  update from 'react-addons-update';

export default function healthchecks(state={}, action={}) {

    switch (action.type) {
        case actions.HC_PINGSUCCESS:
            return update(state,
                {
                    status:{
                        $set:"OK"
                    }
                });
        case actions.HC_PINGERROR:
            return update(state,
                {
                    status:{
                        $set:"Failed"
                    }
                });

        case actions.HC_GETFRONTENDVER:
            return update(state,
                {
                    version:{
                        $set:"V1"
                    }
                });

        default :
            return state;
    }
}