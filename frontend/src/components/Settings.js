/**
* Created by albertoclarit on 9/2/16.
*/
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../actions/modalActions';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

import {Well,Panel,Button,Table,Modal,Alert} from '@sketchpixy/rubix';

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

  open = ()=>{
    this.props.modalActions.open({
      showModal:true,
      modalTitle:"Test",
      colorType:'bg-green',
      modalBody:
        <Alert danger>
          <strong>Oh snap! </strong><span>Change a few things up and try submitting again.</span>
        </Alert>
      ,
      cancelFunction:this.close,
      cancel:<Button bsStyle='primary' onClick={this.close}>Cancel</Button>,
      proceed:<Button bsStyle='green' onClick={this.goAddUser}>Add User</Button>,
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
          <Button bsStyle='green' onClick={this.goAddUser}>Add User</Button>
          <Button bsStyle='primary' onClick={this.open}>Launch demo modal</Button>
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
