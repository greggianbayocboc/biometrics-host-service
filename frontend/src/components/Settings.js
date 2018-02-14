/**
 * Created by albertoclarit on 9/2/16.
 */
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../actions/modalActions';
import * as deviceaction from '../actions/deviceaction';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';
import {post,get,patch} from '~/src/utils/RestClient';
import {message } from 'antd';
import RegisterEmployee from '../components/RegisterEmployee';
import NewDeviceSingleton from './modal/NewDeviceSingleton';
import update from 'react-addons-update';
import _ from "lodash"
import { Form, Icon, Input, Button, Checkbox,Row,Col,Tabs ,Table} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class Settings extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           loading :[{
               id: -1
           }],
            loadingSetdefault :[{
               id: -1
            }]
        }
    }

    componentDidMount(){
        this.setState({ showModal: false });
        this.props.deviceaction.getAllDevices(0)
    }

    close = ()=>{
        this.props.modalActions.close({showModal:false});
    }

    newemployee = ()=>{
        this.props.modalActions.open({
            showModal:true,
            modalTitle:"New Employee",
            colorType:'bg-green',
            modalBody:
                <RegisterEmployee />
            ,
            cancelFunction:this.close
        });
    }

    goAddUser = ()=>{
        this.props.routerActions.push("/adduser");
    }

    addDevice = (data)=>{
        console.log(data,"upSert")
        this.props.deviceaction.upSert(data)

    }
    setAsDefaultDevice = (index,data)=>{
        return()=>{
            delete data._links
            console.log(index,"index")
            let indexes = update(this.state.loadingSetdefault,{
                $push: [index]
            })
            this.setState({
                loadingSetdefault: indexes
            })
            post("/api/bundyclock/checkdeviceconnection",data,{
                params:{
                    index: index
                }
            }).then((response)=>{
                console.log(response,"response")
                if(response.headers.message === "success"){
                    message.success("Connection Success")
                    let removedKey =_.remove(this.state.loadingSetdefault, (n)=>{
                        return n !== response.data
                    });
                    this.setState({
                        loadingSetdefault:removedKey
                    },this.props.deviceaction.setDefaultDevice(data))
                }else{
                    message.error("Connection Failure")
                    console.log(response, "response error")
                    let removedKey =_.remove(this.state.loadingSetdefault, (n)=>{
                        return n !== response.data
                    })
                    this.setState({
                        loadingSetdefault:removedKey
                    })

                }
            }).catch((error)=>{
                console.log(error)
            })

        }

    }

    openFormModal = () =>{
        NewDeviceSingleton.show({
            data:{},
            onSuccess:(data)=>{
                NewDeviceSingleton.hide()
                this.addDevice(data)
            },
            onClose:()=>{
                NewDeviceSingleton.hide()
            }
        })
    }

    openViewFormModal = (data) =>{
        return()=>{
            NewDeviceSingleton.show({
                data,
                onSuccess:(data)=>{
                    NewDeviceSingleton.hide()
                    this.addDevice(data)
                },
                onClose:()=>{
                    NewDeviceSingleton.hide()
                }
            })
        }
    }

    checkDeviceConnection  = (index,data,callback=null) =>{
        return()=>{
            delete data._links
            console.log(index,"index")
            let indexes = update(this.state.loading,{
                $push: [index]
            })
            this.setState({
                loading: indexes
            })
            post("/api/bundyclock/checkdeviceconnection",data,{
                params:{
                    index: index
                }
            }).then((response)=>{
                console.log(response,"response")
                if(response.headers.message === "success"){
                    message.success("Connection Success")
                   let removedKey =_.remove(this.state.loading, (n)=>{
                      return n !== response.data
                   });
                    this.setState({
                        loading:removedKey
                    })
                }else{
                    message.error("Connection Failure")
                    console.log(response, "response error")
                    let removedKey =_.remove(this.state.loading, (n)=>{
                        return n !== response.data
                    })
                    this.setState({
                        loading:removedKey
                    })

                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    }


    render(){
        let columns = [{
                key: "device_name",
                dataIndex:"device_name",
                title: "Device Name"
            },
            {
                key: "ip_address",
                dataIndex:"ip_address",
                title: "IP Address"
            },
            {
                key: "port",
                dataIndex:"port",
                title: "Port"
            },
            {
                key: "Default",
                dataIndex:"default_device",
                title: "default_device",
                render: text=>text?<Icon type="check-circle" style={{color: "#28ff61"}} />: <Icon type="close-circle" style={{color: "#ff153c"}}/>
            },{
                title:"Action",
                key:"action",
                render: (text,record)=>
                    <span>
                        <Button onClick={this.openViewFormModal(record)} style={{marginRight: "10px"}}>View</Button>
                        <Button loading={_.includes(this.state.loadingSetdefault, record.id)} onClick={this.setAsDefaultDevice(record.id,record)} style={{marginRight: "10px"}}>Set As Default</Button>
                        <Button loading={_.includes(this.state.loading, record.id)} onClick={this.checkDeviceConnection(record.id,record)}>Check Connection</Button>
                    </span>
            }
        ]
        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="appstore" />Devices</span>} key="1">
                        <div style={{marginLeft: "10px"}}>
                            <Table rowkey={item => console.log(item, "table logs")} dataSource={this.props.device.records} columns={columns}/>

                            <Button type={"primary"} onClick={this.openFormModal} style={{marginTop: "10px"}}><Icon type={"plus"}/></Button>
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="setting" />Settings</span>} key="2">
                        <div style={{marginLeft: "10px"}}>
                            Settings
                        </div>
                    </TabPane>
                </Tabs>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth:state.auth,
        modal:state.modal,
        device: state.device.device
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch),
        deviceaction: bindActionCreators(deviceaction, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);
