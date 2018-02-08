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


import Sidebar from '../common/sidebar';
import Headers from '../common/header';
import Footer from '../common/footer';

import { Layout, Menu, Icon,Col,Row } from 'antd';
const { Header, Sider, Content } = Layout;

import ModalComponent from '../components/ModalComponent'
import _ from 'lodash';
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

    onHeaderMenuItemClick = (item)=>{
      if(item.key === "1"){
          this.setState({
              collapsed: !this.state.collapsed,
          });
      }
    }



  render(){
    return (
        <Layout>
            {this.props.auth.isAuthenticated || !_.includes(this.props.location.pathname, "/")  || !_.includes(this.props.location.pathname, "/login")? (
                <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              style={{ height: '100vh',background: '#fff' }}
          >
              <Sidebar />

          </Sider>):null}
          <Layout>
              {this.props.auth.isAuthenticated && !_.includes(this.props.location.pathname, "/") || !_.includes(this.props.location.pathname, "/login") ? (
                  <Header style={{ background: '#fff', padding: 0 }}>
                      <Row>
                          <Col span={12}>
                              <Menu
                                  mode="horizontal"
                                  style={{ lineHeight: '64px', backgroundColor: "#fff"}}
                                  onClick={this.onHeaderMenuItemClick}
                              >
                                  <Menu.Item key="1">
                                      <Icon
                                          className="trigger"
                                          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                          onClick={this.toggle}
                                      />
                                  </Menu.Item>
                              </Menu>
                          </Col>
                          <Col span={12} style={{textAlign: "right",paddingRight: "10px",borderBottom:"1px solid #e8e8e8"}}>
                              <div onClick={this.logout}>
                                  <Icon type="logout" />
                              </div>
                          </Col>

                      </Row>

            </Header>):null}



            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
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
