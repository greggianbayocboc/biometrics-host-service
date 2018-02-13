import * as types from '../constants/deviceActionTypes';
import {post,get,patch} from '~/src/utils/RestClient';
import { routerActions } from 'react-router-redux'
import Progress from "react-progress-2";
import {message } from 'antd';

export let upSert = (data) =>{
    return dispatch => {
        if(data.id){
            patch("/restapi/devices/"+data.id, data).then((response)=>{
                if(response){
                    message.success('Device succesfully updated');
                    dispatch(getAllDevices(0))
                }

            }).catch((error)=>{
                console.log(err)
            })
        }else{
            console.log(data,"upsertdata")
            post("/restapi/devices/", data).then((response)=>{
                if(response){
                    message.success('Device succesfully added');
                    dispatch(getAllDevices(0))

                }

            }).catch((error)=>{
                console.log(err)
            })
        }
    }

}

export let addNewEmployee =(data)=>{
    return disptach=>{
        post("/api/bundyclock/addnewmeployeev2",{
            params:{
                name: data.name,
                privilege: data.name,
                workcode: data.workcode
            }
        })
    }
}

export let getAllDevices = (page)=>{
        return dipatch =>{
            get("/restapi/devices/",{
                params:{
                    size: 10,
                    page: page
                }
            }).then((response)=>{
                dipatch(load_allDevices(response.data))
            }).catch((error)=>{
                console.log(error)
            })
        }
}

export let setDefaultDevice = (data)=>{
        return dipatch =>{
            post("/api/bundyclock/setasdefault",data).then((response)=>{
                if(response.headers.connection === "true"){
                    message.success(response.headers.message)
                    dipatch(getAllDevices(0))

                }else{
                    message.success(response.headers.message)
                    dipatch(getAllDevices(0))

                }
            }).catch((error)=>{
                console.log(error)
            })
        }
}

export let checkDeviceConnection = (data) =>{
    return dispatch =>{
        delete data._links
        post("/api/bundyclock/checkdeviceconnection",data).then((response)=>{
            console.log(response,"response")
            if(response.headers.message === "success"){
                message.success("Connection Success")
            }else{
                message.error("Connection Failure")

            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}


export let load_allDevices = (data)=>{
    return{
        type: types.LOAD_ALLDEVICES,
        data: data
    }
}
