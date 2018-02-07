/**
 * Created by albertoclarit on 9/1/16.
 */
import React,{PropTypes} from 'react';
import {Form,Input,Icon,Checkbox,Button } from 'antd'
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as
AuthActions
from
'../actions/authactions';

const FormItem = Form.Item

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        "j_username": null,
        "j_password": "",
        "remember-me": false,
        validated: false
    };
    updateField = (name, value)=> {
        var data = {};
        data[name] = value;

        this.setState(data);
    };

    onFormSubmit = (event)=> {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.authActions.login(values, this.props.location.query.targetPath || "/");

            }
        });

    };


    render() {

        const { getFieldDecorator } = this.props.form;

        return (

            <div style={{width: "40%", margin:"auto"}}>
                <h1>asdfasdf</h1>
                <Form onSubmit={this.onFormSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('j_username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}


                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('j_password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember-me', {
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
                </Form>
            </div>


                );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions: bindActionCreators(AuthActions, dispatch)
    }
}




const WrappedNormalLoginForm = Form.create()(Login);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
