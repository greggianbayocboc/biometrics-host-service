/**
 * Created by albertoclarit on 9/2/16.
 */
import React,{PropTypes} from 'react';
import {Well,Panel} from 'react-bootstrap'
export default class   AccessDenied extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return (
            <div>
                <Well>
                   <h1>Access Denied</h1>

                </Well>
            </div>);
    }
}