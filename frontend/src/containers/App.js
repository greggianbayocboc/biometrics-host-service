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


      let layOutStyle = this.props.auth.isAuthenticated || !_.includes(this.props.location.pathname, "/")  || !_.includes(this.props.location.pathname, "/login")?
          {
              marginLeft: 200
          }:
          {
              marginLeft: 0
          }

    return (
        <Layout>
            {this.props.auth.isAuthenticated || !_.includes(this.props.location.pathname, "/")  || !_.includes(this.props.location.pathname, "/login")? (
                <Sider
              trigger={null}
              style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
          >
              <Sidebar {...this.props} />

          </Sider>):null}
          <Layout  style={layOutStyle}>
              {this.props.auth.isAuthenticated && !_.includes(this.props.location.pathname, "/") || !_.includes(this.props.location.pathname, "/login") ? (
                  <Header style={{ background: '#fff', padding: 0 }}>
                      <Row>
                          <Col span={12}>

                          </Col>
                          <Col span={12} style={{textAlign: "right",paddingRight: "10px"}}>
                              <div onClick={this.logout}>
                                  <Icon type="logout" />
                              </div>
                          </Col>

                      </Row>

            </Header>):null}



            <Content style={{ background: '#fff', margin: 0, minHeight: 280,overflow: 'initial'}}>

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
