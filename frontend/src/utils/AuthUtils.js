/**
 * Created by albertoclarit on 1/13/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/authactions';
import _ from 'lodash';


export function isInRole(role,rolesRepo){
    return _.includes(rolesRepo || [], role);
}


export function isInAnyRole(roles,rolesRepo){

    roles = _.isArray(roles) ? roles : [];
    var found = false;
    roles.forEach(function(i){

        if(isInRole(i,rolesRepo))
        {
            found = true;
        }

    });


    return found;
}

export function requireAuthentication(Component,roles) {

    var rolesArray = [];
    if(typeof roles === 'string'){
        rolesArray.push(roles);
    }

    if(roles instanceof Array){
        rolesArray = roles;
    }


    class AuthenticatedComponent extends React.Component{

        constructor(props){
            super(props);
        }


        componentWillMount(){

            //console.log('componentWillMount');

            var {dispatch} = this.props;
            var targetPath=this.props.location.pathname+this.props.location.search;

            var token = localStorage.login;

            if(token){
                // try checking account if already existed
                if(!this.props.auth.account){
                    // attempt to get account details based on existing session cookie and csrf
                    dispatch(AuthActions.loginSuccess(targetPath,true));
                }

                if(!this.props.auth.fromStart)
                    this.checkRoles(this.props.auth.account);
            }
            else {

                if(!this.props.auth.fromStart)
                 if(targetPath)
                     dispatch(routerActions.push("/login?targetPath="+targetPath));
                 else
                     dispatch(routerActions.push("/login"));
                else {
                    this.checkRoles(this.props.auth.account);
                }
            }

        }

        componentWillUpdate(nextProps){
          //  console.log('componentWillUpdate');
            this.checkRoles(nextProps.auth.account);
        }


        checkRoles=(account)=>{

            var {dispatch} = this.props;
            if(account){
                var roles = account.roles;

                if (roles == null || roles.length == 0) {
                    dispatch(routerActions.push("/accessdenied"));
                    return;
                }



                if (rolesArray.length > 0) {
                    if (rolesArray.length == 1) {

                        if (!isInRole(rolesArray[0], roles)){
                            setTimeout(()=>{
                                dispatch(routerActions.push("/accessdenied"));
                            },100);

                        }
                    }
                    else {
                        if (!isInAnyRole(rolesArray, roles)){
                            setTimeout(()=>{
                                dispatch(routerActions.push("/accessdenied"));
                            },100);

                        }
                    }
                }
            }
        };



        render(){

            var renderMe=null;

            if(this.props.auth.isAuthenticated)
            renderMe=(<Component {...this.props}/>);
            return (
                <div>
                    {renderMe}
                </div>
            );
        }
    }




    const mapStateToProps = (state) => ({
        auth: state.auth
        /*,location: state.routing.location*/
    });





    return connect(mapStateToProps)(AuthenticatedComponent);


}
