/**
 * Created by albertoclarit on 9/1/16.
 */
import React,{PropTypes} from 'react';
import {Well,Panel,FormGroup,ControlLabel,FormControl,Alert} from 'react-bootstrap'
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/authactions';



 class   Login extends React.Component{

    constructor(props){
        super(props);
    }

    state={
        "j_username":null,
        "j_password":"",
        "remember-me":false,
        validated:false
    };
    updateField= (name,value)=>{
        var data = {};
        data[name]=value;

        this.setState(data);
    };

    onFormSubmit=(event)=>{
        event.preventDefault();




        this.props.authActions.login(this.state, this.props.location.query.targetPath || "/");
    };


    render(){

        return (
            <div>
            <Well>
                <br/>
                <br/>
                <br/>
                <br/>  <br/>
                <form className="form-signin" onSubmit={this.onFormSubmit}>
                <div style={{width:'500px',marginLeft:'auto',marginRight:'auto'}}>

                    {this.props.auth.isWrongCredentials ?
                        <Alert bsStyle="danger">Wrong Credentials</Alert>
                        :null}
                    {this.props.auth.logoutSuccess ?
                        <Alert bsStyle="success">You are now logged-out</Alert>
                        :null}



                <Panel header="Login Credentials" bsStyle="primary">
                    <FormGroup>
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl type="text"
                                     tabIndex="3"
                                     placeholder="Email Address"
                                     onChange={(e)=>{this.updateField('j_username',e.target.value)}}
                            />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type="password"
                                     tabIndex="4"
                                     placeholder="Password"
                                     onChange={(e)=>{this.updateField('j_password',e.target.value)}}
                            />
                    </FormGroup>


                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" checked={this.state['remember-me']} onChange={(e)=>{
                                            this.setState({
                                            "remember-me":e.target.checked
                                            });
                                            }}/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-md btn-primary btn-block" type="submit">Sign in</button>

                </Panel>
                </div>
               </form>

            </Well>
            </div>);
    }
}


function mapStateToProps(state) {
    return {
        auth:state.auth
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);