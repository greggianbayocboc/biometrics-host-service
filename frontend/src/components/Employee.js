import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as employeeActions from '../actions/employeeActions';
import * as profileActions from '../actions/profileActions';
import {routerActions} from 'react-router-redux';
import * as modalActions from '../actions/modalActions';
import {Table, Button,Well,PanelContainer,Panel,PanelHeader,Grid,Row,Col,PanelBody,ButtonGroup,InputGroup,Icon} from '@sketchpixy/rubix';
class Employee extends React.Component{


    constructor(props){
        super(props);

    }



    componentDidMount(){
        this.props.employeeActions.getEmployeeActions();
    }

    onSelectedRow=(enrollno, name)=>{
      return ()=>{
        this.props.profileActions.loadBundyclockLogsById(enrollno, name);
        this.props.routerActions.push("/profile");
      }
    }

    close = ()=>{
        this.props.modalActions.close({showModal:false});
    }

    deleteUserEmployee = (enrollno) =>{
        this.props.employeeActions.deleteEmployeeActions(enrollno);
        this.props.modalActions.close({showModal:false});
    }


    deleteemployee = (enrollno)=>{
        this.props.modalActions.open({
            showModal:true,
            modalTitle:"Warning",
            colorType:'bg-red',
            modalBody:
                <p>Are you sure you want to delete Employee?</p>
            ,
            cancelFunction:this.close,
            cancel:<Button bsStyle='primary' onClick={this.close}>Cancel</Button>,
            proceed:<Button bsStyle='red' onClick={()=>this.deleteUserEmployee(enrollno)}>Delete</Button>
        });
    }

    render() {



        var users = this.props.employee.records.map((item, i)=>{
            return(
                <tr key = {i}>
                    <td>{item.dwEnrollNumber}</td>
                    <td>{item.name}</td>
                    <td>{item.privilege}</td>
                    <td>
                        <Button className='btn btn-primary' onClick={this.onSelectedRow(item.dwEnrollNumber, item.name)} style={{marginRight: 5}}>View Logs</Button>
                        {/* <Button bsStyle='danger' onClick={()=>this.deleteemployee(item.dwEnrollNumber)}><Icon glyph='glyphicon glyphicon-remove' style={{marginRight: 5}}/>Delete</Button> */}
                    </td>
                </tr>

            );
        });


        return(
                <div>



                <PanelContainer>

                    <Panel>
                        <PanelHeader className='bg-green'>
                            <Grid>
                                <Row>
                                    <Col xs={12} className='fg-white'>
                                        <h1>Employee List</h1>

                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12}>
                                        <Table responsive>
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
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
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
        modalActions: bindActionCreators(modalActions, dispatch)

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
