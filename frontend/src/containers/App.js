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

require('react-progress-2/main.css');

 class   App extends React.Component{

    constructor(props){
        super(props);
    }



    componentDidMount(){

            this.props.actions.ping();


        }

    render(){

        return (<div className="container">
                <Progress.Component/>
                      {this.props.children}
                </div>);
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
