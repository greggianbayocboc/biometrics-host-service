import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as employeeActions from '../actions/employeeActions';
import * as profileActions from '../actions/profileActions';
import {routerActions} from 'react-router-redux';
import {Table, Button} from '@sketchpixy/rubix';
class Employee extends React.Component{


  constructor(props){
      super(props);
  }

  componentDidMount(){
    this.props.employeeActions.getEmployeeActions();
  }
    onSelectedRow=(enrollno, name)=>{
      this.props.profileActions.loadBundyclockLogsById(enrollno, name);
      this.props.routerActions.push("/profile");
    }


    render() {

      var users = this.props.employee.records.map((item, i)=>{
          return(
              <tr key = {i}>
                <td>{item.dwEnrollNumber}</td>
                <td>{item.name}</td>
                <td>{item.privilege}</td>
                <td><Button className='btn btn-primary' onClick={()=>{this.onSelectedRow(item.dwEnrollNumber, item.name)}}>View Profile</Button></td>
              </tr>

          );
      });

      return(
          <Table striped bordered condensed hover>
              <thead>
                  <tr>
                      <th>Enroll Number</th>
                      <th>Emp Name</th>
                      <th>Privilege</th>
                      <th>Info</th>
                  </tr>

              </thead>
            <tbody>


                {users}
            </tbody>

          </Table>
      );

    }

}
function mapStateToProps(state) {
  return {
      employee: state.employee,
      bundyclock:state.bundyclock
  }
}




function mapDispatchToProps(dispatch){
  return {
      routerActions: bindActionCreators(routerActions, dispatch),
      employeeActions : bindActionCreators(employeeActions, dispatch),
      profileActions:bindActionCreators(profileActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
