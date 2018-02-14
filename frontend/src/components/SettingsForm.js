import React from 'react'
import { Form, Icon, Input, Button, Checkbox,Row,Col,Tabs } from 'antd';
import { connect } from 'react-redux';
import * as modalActions from '../actions/modalActions';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

const FormItem = Form.Item;

class SettingsForm extends React.Component{
    constructor(props){
        super(props);
    }


    render(){

        const { getFieldDecorator } = this.props.form;

        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Row>
                    <Col span={12} style={{paddingRight: "10px"}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>

                    </Col>
                    <Col span={12} style={{paddingLeft: "10px"}}>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
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


const WrappedNormalLoginForm = Form.create()(SettingsForm);

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);

