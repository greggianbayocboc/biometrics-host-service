import React from 'react';

import { Layout, Menu, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/authactions';
import * as profileActions from '../actions/profileActions';
import { routerActions } from 'react-router-redux';

import {isInRole,isInAnyRole} from '../utils/AuthUtils'

class SidebarContainer extends React.Component {
  constructor(props){
      super(props);
      this.state={
          keyPath:[this.props.location.pathname]
      }
  }

  goProfile = ()=>{
      console.log("pass here")
      this.props.profileActions.loadBundyclockLogsById(this.props.auth.account.bundyclockEnrollNo, this.props.auth.account.firstName +" "+ this.props.auth.account.lastName);
      this.props.routerActions.push("/profile");
  }

  goEmployee = ()=>{
      this.props.routerActions.push("/employee");
  }

  goSettings = ()=>{
      this.props.routerActions.push("/settings");
  }

  checkRoles=(Component, roles)=>{
    var rolesArray = [];
    if(typeof roles === 'string'){
      rolesArray.push(roles);
    }

    if(roles instanceof Array){
      rolesArray = roles;
    }

    var account = this.props.auth.account;

    if(account){
      var roles = account.roles;

      if (roles == null || roles.length == 0) {
        return <noscript />;
      }

      if (rolesArray.length > 0) {
        if (rolesArray.length == 1) {

          if (!isInRole(rolesArray[0], roles)){
            return <noscript />;
          }
          else {
            return Component;
          }
        }
        else {
          if (!isInAnyRole(rolesArray, roles)){
            return <noscript />;
          }
          else {
            return Component;
          }
        }
      }
    }
  }

  onMenuItemClick=(item)=>{
      console.log(item.key)

      if(item.key==="/employee"){
          this.props.routerActions.push("/employee");
      }else if(item.key === "/settings"){
          this.props.routerActions.push("/settings");

      }
      this.setState({
          keyPath: item.keyPath
      })
  }

  render() {
    return (
        <Menu theme="dark" mode="inline" onClick={this.onMenuItemClick} defaultSelectedKeys={this.state.keyPath} style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item key="/employee">
            <Icon type="video-camera" />
            <span>
               Employee
            </span>
          </Menu.Item>
          <Menu.Item key="/settings">
            <Icon type="upload" />
            <span>
                   Settings
            </span>
          </Menu.Item>
        </Menu>
    );
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
        profileActions: bindActionCreators(profileActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SidebarContainer);
