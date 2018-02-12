import React from 'react'
import Singleton from "../../utils/Singleton";
import {Modal,Button,Spin} from 'antd'
import update from 'react-addons-update';
import {get} from '~/src/utils/RestClient';
import moment from 'moment'
import Select from 'react-select';
import NewDeviceForm from './NewDeviceForm';
import _ from 'lodash'
class NewDeviceSingleton extends React.Component{
    constructor(props){
        super(props)

    }
    state={
        show: false,
        activeRecord: {},
        loading: false
    };

    close =()=>{
        return()=>{
            this.props.onClose()
        }
    }

    close2 =(action, data)=>{

        if(action){
            if(data.checked_date){
                data.checked_date = moment(data.checked_date).format(dbDateFormat)
            }

            this.props.onSuccess(data);
        }else{
            this.props.onClose()
        }

    }


    beforeClose =(data)=>{
        this.close2(true, data)
    }

    updateField = (fieldname, value)=>{
        var payload = {};
        payload[fieldname] = value;

        if(fieldname === "item"){
            if(value){
                if(value.id){
                    payload["unit"] = value.package_name;
                }else {
                    payload["unit"] ="";
                }
            }else{
                payload["unit"] ="";
            }

        }


        var newRecord = update(this.state.activeRecord,{
            $merge: payload
        });


        this.setState({
            activeRecord: newRecord
        })

    }

    getItems = (input) => {
        return new Promise( (resolve, reject)=> {
            get('/restapi/items/search/findByQueryableString',{
                params:{
                    filter:input
                }
            }).then((response) => {
                if(response.data){

                    var items = response.data._embedded.items.map((item) => {
                        return item
                    });
                    resolve({
                        options:items
                    });

                }
            }).catch((error)=>{
                reject(error);
            });
        });
    };



    render(){
        var activeRecord = this.state.activeRecord;

        var schema =  {
            item: "required",
            quantity: "required|numeric",
            unit: "required"
        };

        var attributes = {
            item: "Item/Description",
            quantity: "Quantity",
            unit: "Unit"
        };

        var message= {
            "required": "The field :attribute is required!",
            "numeric": "The field :attribute  should be a number!"
        };

        return(
            <Modal maskClosable={false} visible={this.state.show} title={"New Device"} footer={null} width={"45%"} onCancel={this.close()}>
                <Spin spinning={this.state.loading}>
                    <NewDeviceForm onSubmit={(data)=>this.beforeClose(data)} handleCancel={this.close()} activeRecord={this.state.activeRecord}/>
                </Spin>
            </Modal>
        )
    }

}


export default new Singleton(NewDeviceSingleton)