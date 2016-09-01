/**
 * Created by albertoclarit on 1/9/16.
 */
import React,{PropTypes} from 'react';
import {Button} from 'react-bootstrap'
export default class   App extends React.Component{

    constructor(props){
        super(props);
    }



    render(){

        return (<div className="container">
                  <h1>Welcome to React JS
                      <br/>
                      <Button bsStyle="primary">Gogogog!</Button></h1>
                </div>);
    }
}

