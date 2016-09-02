/**
 * Created by albertoclarit on 9/2/16.
 */
import React,{PropTypes} from 'react';
import {Well,Panel,Button} from 'react-bootstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux'
class   SecurePage extends React.Component{

    constructor(props){
        super(props);
    }



    logout=()=>{
        this.props.authActions.logout();
    };

    render(){

        return (
            <div>
                <Well>
                    <h1>This is a secured Page than can only be viewed by logged-in users</h1>
                    <Button bsStyle="warning" onClick={this.logout}> Logout</Button>
                </Well>
            </div>);
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

export default connect(mapStateToProps,mapDispatchToProps)(SecurePage);
