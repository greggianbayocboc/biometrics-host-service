/**
 * Created by albertoclarit on 9/1/16.
 */
import React,{PropTypes} from 'react';
import {ControlLabel,FormControl} from 'react-bootstrap'
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as
AuthActions
from
'../actions/authactions';
import {Well,Panel,Button,Table,PanelContainer,PanelBody,Col,Grid,InputGroudAddon,FormGroup,Alert} from '@sketchpixy/rubix';


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


        this.props.authActions.login(this.state, this.props.location.query.targetPath || "/");
    };


    render() {

        return (

                 <div style={{margin: 'auto'}}>
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                    <Grid>
                            <div className='row' style={{margin: 'auto'}}>
                                <Col style={{sm: 4, smOffset: 4, xsOffset:1, xs:10}}>
                                    <Col className='col-xs-collapse-right col-xs-collapse-left' style={{sm:4, smOffset:4, xs:10, xsOffset:1}}>
                                        <div className='col-xs-collapse-right  col-xs-collapse-left  col-sm-4 col-sm-offset-4 col-xs-10 col-xs-offset-1'>
                                            <PanelContainer>
                                                        <Panel>

                                                                <div>
                                                                    <PanelBody style={{padding: 0}}>
                                                                            <div className='text-center bg-darkblue fg-white'>
                                                                                <h3 style={{margin: 0, padding: 25}} >Login</h3>
                                                                            </div>
                                                                            <div style={{margin: 'auto', marginButtom: 25, marginTop: 25, padding: 25, paddingButtom: 0, paddingTop: 0}}>
                                                                            <form className="form-signin" onSubmit={this.onFormSubmit}>
                                                                                <div style={{
                                                                                    width: 'auto',
                                                                                    marginLeft: 'auto',
                                                                                    marginRight: 'auto'
                                                                                }}>

                                    {this.props.auth.isWrongCredentials ?
                                        <Alert bsStyle="danger">Wrong Credentials</Alert>
                                        : null}
                                    {this.props.auth.logoutSuccess ?
                                        <Alert bsStyle="success">You are now logged-out</Alert>
                                        : null}


                                                                                    <Panel>
                                                                                        <FormGroup bsClass='form-group'>
                                                                                            <ControlLabel>Email address</ControlLabel>
                                                                                            <FormControl type="text"
                                                                                                tabIndex="3"
                                                                                                placeholder="Email Address"
                                                                                                onChange={(e)=> {
                                                                                                    this.updateField('j_username', e.target.value)
                                                                                                }}
                                                                                            />
                                                                                        </FormGroup>

                                                                                        <FormGroup>
                                                                                            <ControlLabel>Password</ControlLabel>
                                                                                            <FormControl type="password"
                                                                                                tabIndex="4"
                                                                                                placeholder="Password"
                                                                                                onChange={(e)=> {
                                                                                                    this.updateField('j_password', e.target.value)
                                                                                                }}
                                                                                            />
                                                                                        </FormGroup>


                                                                                        <div className="checkbox">
                                                                                            <label>
                                                                                                <input type="checkbox" value="remember-me" checked={this.state['remember-me']} onChange={(e)=> {
                                                                                                    this.setState({
                                                                                                        "remember-me": e.target.checked
                                                                                                    });
                                                                                                }}/>
                                                                                            Remember me
                                                                                            </label>
                                                                                        </div>
                                                                                        <button className="btn btn-md btn-primary btn-block" type="submit">Sign in</button>

                                                                                    </Panel>
                                                                                </div>

                                                                            </form>
                                                                            </div>
                                                                    </PanelBody>
                                                                </div>
                                                        </Panel>
                                            </PanelContainer>
                                        </div>
                                    </Col>
                                </Col>
                            </div>
                        </Grid>
                 </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
