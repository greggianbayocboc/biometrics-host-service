import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as employeeActions from '../actions/employeeActions';
import * as bundyClockActions from '../actions/bundyclockActions';
import * as profileActions from '../actions/profileActions';
import {routerActions} from 'react-router-redux';
import RegisterEmployee from '../components/RegisterEmployee';
import * as modalActions from '../actions/modalActions';
//import {Table, Button,Well,PanelContainer,Panel,PanelHeader,Grid,Row,Col,PanelBody,ButtonGroup,InputGroup,Icon} from '@sketchpixy/rubix';

import { Table, Icon, Divider } from 'antd';
class Employee extends React.Component{

  constructor(props){
    super(props);

  }

  componentDidMount(){
    this.props.employeeActions.getEmployeeActions();
  }

  onSelectedRow=(enrollno, name)=>{
    return ()=>{
      this.props.routerActions.push("/profile/"+name+"/"+enrollno);
    }
  }

  close = ()=>{
    this.props.modalActions.close({showModal:false});
  }

  // deleteUserEmployee = (enrollno) =>{
  //   this.props.employeeActions.deleteEmployeeActions(enrollno);
  //   this.props.modalActions.close({showModal:false});
  // }

  // clearlogs = () =>{
  //     console.log("clicked")
  //     this.props.bundyClockActions.clearEmployeeLogs();
  // }


  // deleteemployee = (enrollno)=>{
  //   this.props.modalActions.open({
  //     showModal:true,
  //     modalTitle:"Warning",
  //     colorType:'bg-red',
  //     modalBody:
  //     <p>Are you sure you want to delete Employee?</p>
  //     ,
  //     cancelFunction:this.close,
  //     cancel:<Button bsStyle='primary' onClick={this.close}>Cancel</Button>,
  //     proceed:<Button bsStyle='red' onClick={()=>this.deleteUserEmployee(enrollno)}>Delete</Button>
  //   });
  // }

  // clearemployeelogsmodal = () =>{
  //     this.props.modalActions.open({
  //         showModal: true,
  //         modalTitle: "!!!Warning",
  //         colorType: 'bg-yellow',
  //         modalBody:
  //             <div>
  //             <p>Are you sure you want to clear Employee Logs?</p><br/>
  //             <p>Note: Attendance Logs will be automatically saved to local database. For Backup purpose.</p>
  //             </div>,
  //         cancelFunction: this.close,
  //         cancel:<Button bsStyle='primary' onClick={this.close}>Cancel</Button>,
  //         proceed:<Button bsStyle='yellow' onClick={this.clearlogs}>Clear</Button>
  //     });
  // }



  render() {



      const columns = [{
          title: 'Enroll no.',
          dataIndex: 'dwEnrollNumber',
          key: 'dwEnrollNumber',
          sortOrder: 'ascend',
          sorter: (a, b) => a.dwEnrollNumber-b.dwEnrollNumber,
          render: text => <a href="#">{text}</a>,
      }, {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
      }, {
          title: 'Privilege',
          dataIndex: 'privilege',
          key: 'privilege',
      }, {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
              <span>
                  <a onClick={this.onSelectedRow(record.dwEnrollNumber, record.name)} className="ant-dropdown-link">
                      View Logs
                  </a>
              </span>
          ),
      }];

    return(
        <div >
            <h1 style={{marginLeft: "10px"}}>Employees</h1>
            <Table columns={columns} rowKey={(item)=> item.dwEnrollNumber} dataSource={this.props.employee.records}/>
        </div>
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
    profileActions:bindActionCreators(profileActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
    bundyClockActions: bindActionCreators(bundyClockActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
