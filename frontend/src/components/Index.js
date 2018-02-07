/**
 * Created by albertoclarit on 9/1/16.
 */
import React,{PropTypes} from 'react';
import {Button} from 'react-bootstrap'
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

 class   Index extends React.Component{

    constructor(props){
        super(props);
    }

    goSecure = ()=>{
        this.props.routerActions.push("/secure");
    };

    render(){

        return (<div>


                 <h1>Welcome to React JSss
                    <br/>
                  <Button bsStyle="primary" onClick={this.goSecure}>Go to a secure page!</Button></h1>
            </div>);
    }
}

function mapStateToProps(state) {

    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Index);
