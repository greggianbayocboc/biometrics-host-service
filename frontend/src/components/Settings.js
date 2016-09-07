/**
 * Created by albertoclarit on 9/2/16.
 */
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bundyclockActions from '../actions/bundyclockActions';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

import {Well,Panel,Button,Table} from '@sketchpixy/rubix';

class Settings extends React.Component{

    constructor(props){
        super(props);
    }


   componentDidMount(){
     this.props.bundyclockActions.loadBundyclockLogs();

   }

    logout=()=>{
        this.props.authActions.logout();
    };

    render(){


       var records = this.props.bundyclock.records.map((item,i)=>{

         return (
            <tr key={i}>
                  <td>{item.dwEnrollNumber}</td>
                  <td>{item.dwVerifyMode}</td>
                  <td>{item.dwInoutMode}</td>
                  <td>{item.dwYear}</td>
                  <td>{item.dwMonth}</td>
                  <td>{item.dwDay}</td>
                  <td>{item.dwHour}</td>
                  <td>{item.dwMinute}</td>
                  <td>{item.dwSecindm}</td>
                  <td>{item.dwWorkCode}</td>
            </tr>
         );

       });
        return (
            <div>
                <Well>
                    <h1>This is a secured Page than can only be viewed by logged-in users</h1>
                    <Button bsStyle="warning" onClick={this.logout}> Logout</Button>
                    <Button bsStyle='green'>Green Button!</Button>
              		  <Button bsStyle='red'>Red Button!</Button>
              		  <Button bsStyle='blue' outlined>Blue Button!</Button>

                    <Table striped bordered condensed >
                       <thead>
                          <tr>
                                <th>dwEnrollNumber</th>
                                <th>dwVerifyMode</th>
                                <th>dwInoutMode</th>
                                <th>dwYear</th>
                                <th>dwMonth</th>
                                <th>dwDay</th>
                                <th>dwHour</th>
                                <th>dwMinute</th>
                                <th>dwSecindm</th>
                                <th>dwWorkCode</th>
                          </tr>
                       </thead>
                       <tbody>
                         {records}
                       </tbody>
                    </Table>

                </Well>
            </div>);
    }


}

function mapStateToProps(state) {
    return {
        auth:state.auth,
        bundyclock:state.bundyclock
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch),
        bundyclockActions:bindActionCreators(bundyclockActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);
