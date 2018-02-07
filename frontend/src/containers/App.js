/**
* Created by albertoclarit on 1/9/16.
*/
import React,{PropTypes} from 'react';
import {Button} from 'react-bootstrap'
import Progress from "react-progress-2";
import * as HealthChecksAction from '../actions/healthchecks';
import * as authactions  from '../actions/authactions';
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

import Sidebar from '../common/sidebar';
import Headers from '../common/header';
import Footer from '../common/footer';

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

import ModalComponent from '../components/ModalComponent'

require('react-progress-2/main.css');
require('react-progress-2/main.css');

require('../styles/css/custom-styles.css');
class   App extends React.Component{

  constructor(props){
    super(props);
  }

    state = {
        collapsed: false,
    };

  componentDidMount(){
    this.props.actions.ping();
  }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logout=()=>{
        this.props.authActions.logout();
    }

    goHome = ()=>{
        this.props.routerActions.push("/");
    }

  render(){
    return (
        <Layout>
            {this.props.auth.isAuthenticated ? (<Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              style={{ height: '100vh', position: 'fixed' }}
          >
              <Sidebar />

          </Sider>):null}
          <Layout>
              {this.props.auth.isAuthenticated ? (
                  <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
              />
                <Icon type="upload"
                      onClick={this.logout}

                />

                <Icon type="upload"
                      onClick={this.goHome}

                />

            </Header>):null}



            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
                {this.props.children}
            </Content>
          </Layout>
        </Layout>
    );
  }
}

function mapStateToProps(state) {

  return {
    healthchecks: state.healthchecks,// name of reducers
    auth:state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HealthChecksAction, dispatch),
    authActions: bindActionCreators(authactions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
