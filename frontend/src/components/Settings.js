/**
 * Created by albertoclarit on 9/2/16.
 */
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../actions/modalActions';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

import RegisterEmployee from '../components/RegisterEmployee';
import NewDeviceSingleton from './modal/NewDeviceSingleton';

import { Form, Icon, Input, Button, Checkbox,Row,Col,Tabs ,Table} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class Settings extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.setState({ showModal: false });
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

    openFormModal = () =>{
        NewDeviceSingleton.show({
            onSuccess:(data)=>{
                NewDeviceSingleton.hide()
            },
            onClose:()=>{
                NewDeviceSingleton.hide()
            }
        })
    }

    render(){


        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="appstore" />Devices</span>} key="1">
                        <div style={{marginLeft: "10px"}}>
                            <Table dataSource={[]} columns={[]}/>

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
        modal:state.modal
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);
