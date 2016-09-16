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

import {Well,Panel,Button,ButtonGroup,Table,Modal,Alert} from '@sketchpixy/rubix';

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

  render(){
    return (
      <div>
        <Well>
          <h1>This is the Admin settings page</h1>
          <ButtonGroup style={{margin: 5}}>
          <Button bsStyle='green' onClick={this.goAddUser}>Add User</Button>
          <Button bsStyle='green' onClick={this.newemployee}>Create Employee</Button>
          <Button bsStyle='blue'>Sync Employees</Button>
          </ButtonGroup>
        </Well>
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
