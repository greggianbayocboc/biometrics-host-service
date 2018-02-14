import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Link, withRouter } from 'react-router';

import { Layout, Menu, Icon } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    logout=()=>{
        this.props.authActions.logout();
    }

    goHome = ()=>{
        this.props.routerActions.push("/");
    }

    render() {
        return (
            <Layout>


            </Layout>
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
        authActions:bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
