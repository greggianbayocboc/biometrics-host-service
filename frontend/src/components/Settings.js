/**
* Created by albertoclarit on 9/2/16.
*/
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bundyclockActions from '../actions/bundyclockActions';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

import {Well,Panel,Button,Table} from '@sketchpixy/rubix';

class Settings extends React.Component{

  constructor(props){
    super(props);
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
        </Well>
      </div>
    );
  }


}

function mapStateToProps(state) {
  return {
    auth:state.auth,
    bundyclock:state.bundyclock
  }
}


function mapDispatchToProps(dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    authActions:bindActionCreators(AuthActions, dispatch),
    bundyclockActions:bindActionCreators(bundyclockActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);
