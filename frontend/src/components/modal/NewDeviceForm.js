import React from 'react'
import { Form, Icon, Input, Button, Checkbox,Row,Col,Tabs } from 'antd';
import { connect } from 'react-redux';
import * as modalActions from '../../actions/modalActions';
import * as AuthActions from '../../actions/authactions';
import { routerActions } from 'react-router-redux';

const FormItem = Form.Item;

class SettingsForm extends React.Component{
    constructor(props){
        super(props);
    }


    render(){

        const { getFieldDecorator } = this.props.form;

        return(
            <Form onSubmit={this.handleSubmit} layout={"inline"}>
                <Row>
                    <Col span={24} style={{paddingRight: "10px"}}>
                        <FormItem
                            label="IP Address"
                        >
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="IP Address" />
                            )}
                        </FormItem>
                        <FormItem
                            label="Port"
                        >

                            {getFieldDecorator('port', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
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
        modalActions: bindActionCreators(modalActions, dispatch)
    }
}


export default Form.create()(SettingsForm)

