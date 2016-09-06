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
import Header from '../common/header';
import Footer from '../common/footer';

require('react-progress-2/main.css');

 class   App extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.ping();
    }

    render(){
        return (
          <MainContainer {...this.props}>
            <Progress.Component/>
            {
              this.props.auth.isAuthenticated ? (
                <Sidebar />
              ): null
            }
            {
              this.props.auth.isAuthenticated ? (
                <Header />
              ): null
            }
            <div id='body'>
              <Grid>
                <Row>
                  <Col xs={12}>
                  {this.props.children}
                  </Col>
                </Row>
              </Grid>
            </div>
            <Footer />
          </MainContainer>
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
