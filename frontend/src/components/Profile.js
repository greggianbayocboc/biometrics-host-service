/**
 * Created by albertoclarit on 9/2/16.
 */
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profileActions';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

import {Well,Panel,Button,Table,PanelContainer,PanelHeader,Grid,Row,Col,PanelBody} from '@sketchpixy/rubix';

class Profile extends React.Component{

  constructor(props){
    super(props);
  }

  logout=()=>{
    this.props.authActions.logout();
  }

  goBack=()=>{
    this.props.routerActions.goBack();
  }

  render(){

    var records = this.props.profile.records.map((item,i)=>{

      return (
        <tr key={i}>
        <td>{item.dwEnrollNumber}</td>
        <td>{item.dwVerifyMode}</td>
        <td>{item.dwInoutMode}</td>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>{item.dwWorkCode}</td>
        </tr>
      );

    });

    return (
      <PanelContainer>
        <Panel>
          <PanelHeader className='bg-green'>
            <Grid>
              <Row>
                <Col xs={10} className='fg-white'>
                  <h1>{this.props.profile.name}</h1>
                </Col>
                <Col xs={2} className='fg-white'>
                  <h1>
                    <Button className='btn btn-primary' onClick={this.goBack}>Back</Button>
                  </h1>
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
                      <th>Verify Mode</th>
                      <th>Time In/Out</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Work Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records}
                  </tbody>
                  </Table>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

function mapStateToProps(state) {
    return {
        auth:state.auth,
        profile:state.profile
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch),
        profileActions:bindActionCreators(profileActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
