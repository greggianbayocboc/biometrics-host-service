import React from 'react'
import { Form, Icon, Input, Button, Checkbox,Row,Col,Tabs,message } from 'antd';
import { connect } from 'react-redux';
import * as modalActions from '../../actions/modalActions';
import * as deviceaction from '../../actions/deviceaction';
import * as AuthActions from '../../actions/authactions';
import { routerActions } from 'react-router-redux';
import {post,get} from '~/src/utils/RestClient';

const FormItem = Form.Item;

class SettingsForm extends React.Component{
    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id = this.props.activeRecord.id?this.props.activeRecord.id:null;
                this.props.onSubmit(values)
            }
        });
    }


    render(){

        const { getFieldDecorator } = this.props.form;

        return(
            <Form onSubmit={this.handleSubmit} layout={"inline"}>
                <Row>
                    <Col span={24} style={{paddingRight: "10px"}}>
                        <FormItem
                            label="Device name"
                        >
                            {getFieldDecorator('device_name', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                                initialValue: this.props.activeRecord.device_name?this.props.activeRecord.device_name:""
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="IP Address" />
                            )}
                        </FormItem>
                        <FormItem
                            label="IP Address"
                        >
                            {getFieldDecorator('ip_address', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                                initialValue: this.props.activeRecord.ip_address?this.props.activeRecord.ip_address:""

                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="IP Address" />
                            )}
                        </FormItem>
                        <FormItem
                            label="Port"
                        >

                            {getFieldDecorator('port', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                                initialValue: this.props.activeRecord.port?this.props.activeRecord.port:""

                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Port" />
                            )}
                        </FormItem>

                    </Col>

                </Row>
                <Row>
                    <Col span={12} style={{paddingLeft: "10px"}}>
                        <FormItem>
                            <Button type={"primary"} htmlType="submit" icon={"plus"} className="login-form-button" style={{marginRight: "10px"}}>
                                Add
                            </Button>
                            <Button htmlType="submit" icon={"link"} className="login-form-button" style={{backgroundColor:"#00d044", color:"#fff"}}>
                                Check Connection
                            </Button>
                        </FormItem>
                    </Col>
                </Row>

            </Form>
        )
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
        modalActions: bindActionCreators(modalActions, dispatch),
        deviceaction: bindActionCreators(deviceaction, dispatch),
    }
}


export default Form.create()(SettingsForm)

