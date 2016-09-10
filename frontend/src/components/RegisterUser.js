/**
 * Created by albertoclarit on 9/2/16.
 */
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profileActions';
import * as registerActions from '../actions/registerActions';
import { routerActions } from 'react-router-redux';

import {Button,Col,Panel,PanelContainer,PanelHeader,PanelBody,Form,FormGroup,ControlLabel,FormControl,Alert} from '@sketchpixy/rubix';

class RegisterUser extends React.Component{

  constructor(props){
    super(props);
  }

  state = {
    "login": null,
    "password": "",
    "firstName": null,
    "lastName": null,
    "email": null,
    "confirm_password": ""
  };

  updateField = (name, value)=> {
    var data = {};
    data[name] = value;

    this.setState(data);
  };

  onFormSubmit = (event)=> {
    console.log(this.state);
    event.preventDefault();
    this.props.registerActions.login(this.state, this.props.location.query.targetPath || "/");
  };

  goBack=()=>{
    this.props.routerActions.goBack();
  }

  render(){
    return (
      <PanelContainer>
        <Panel>
          <div>
            <PanelBody style={{padding: 0}}>
              <div className='text-center bg-darkblue fg-white'>
                <h3 style={{margin: 0, padding: 25}} >Login</h3>
              </div>
              <div style={{margin: 'auto', marginButtom: 25, marginTop: 25, padding: 25, paddingButtom: 0, paddingTop: 0}}>
                <Form horizontal  onSubmit={this.onFormSubmit}>
                  <FormGroup>
                    <Col componentClass={ControlLabel} xs={2}>Username</Col>
                	  <Col xs={10}>
                		<FormControl type="text" placeholder="Username" required="required"
                      onChange={(e)=> {
                        this.updateField('login', e.target.value)
                      }}
                    />
                	  </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} xs={2}>First name</Col>
                	  <Col xs={10}>
                		<FormControl type="text" placeholder="First name" required="required"
                      onChange={(e)=> {
                        this.updateField('firstName', e.target.value)
                      }}
                    />
                	  </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} xs={2}>Last name</Col>
                	  <Col xs={10}>
                		<FormControl type="text" placeholder="Last name" required="required"
                      onChange={(e)=> {
                        this.updateField('lastName', e.target.value)
                      }}
                    />
                	  </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} xs={2}>Email</Col>
                	  <Col xs={10}>
                		<FormControl type="email" placeholder="Email" required="required"
                      onChange={(e)=> {
                        this.updateField('email', e.target.value)
                      }}
                    />
                	  </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} xs={2}>Password</Col>
                	  <Col xs={10}>
                		<FormControl type="password" placeholder="Password" required="required"
                      onChange={(e)=> {
                        this.updateField('password', e.target.value)
                      }}
                    />
                	  </Col>
                  </FormGroup>

                  {/* {this.state.password != this.state.confirm_password ?
                    <Alert bsStyle="danger">Passwords don't match</Alert>
                  : null} */}

                  <FormGroup>
                    <Col componentClass={ControlLabel} xs={2}>Confirm Password</Col>
                	  <Col xs={10}>
                		<FormControl type="password" placeholder="Password" required="required"
                      onChange={(e)=> {
                        this.updateField('confirm_password', e.target.value)
                      }}
                    />
                	  </Col>
                  </FormGroup>

                  <FormGroup>
                	  <Col xsOffset={2} xs={10}>
                		<Button type="submit">Submit</Button>
                	  </Col>
                	</FormGroup>

                </Form>
              </div>
            </PanelBody>
          </div>
        </Panel>
      </PanelContainer>
    );
  }
}

function mapStateToProps(state) {
    return {
        auth:state.auth,
        profile:state.profile
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        registerActions:bindActionCreators(registerActions, dispatch),
        profileActions:bindActionCreators(profileActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterUser);
