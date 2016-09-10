/**
* Created by albertoclarit on 9/2/16.
*/
import React,{PropTypes} from 'react';
import {Jumbotron} from '@sketchpixy/rubix';

export default class SuccessPage extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Jumbotron>
        <h1>Success!</h1>
      </Jumbotron>
    );
  }
}
