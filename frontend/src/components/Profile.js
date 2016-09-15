/**
 * Created by albertoclarit on 9/2/16.
 */
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profileActions';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

import moment from 'moment';

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

    var records = [];
    var logs = [];
    var x = 0;

    this.props.profile.records.map((item,i)=>{
      var date = moment.utc([item.dwYear, item.dwMonth-1, item.dwDay]).format("dddd, MMMM D YYYY");
      var time = moment.utc([item.dwYear, item.dwMonth-1, item.dwDay, item.dwHour, item.dwMinute, item.dwSecindm]);
      if (typeof records[x] == 'undefined') {
        logs.push({
          time: time,
          action: item.dwInoutMode
        });
        records[x] = {date:date}
        if (records.length == x+1) {
          if (records[x].date == date) {
            records[x] = {date:date, logs};
          } else {
            records.push({date:records[x].date, logs});
          }
        }
      } else {
        if (records[x].date == date) {
          logs.push({
            time: time,
            action: item.dwInoutMode
          });
        } else {
          records[x] = {date:records[x].date, logs};
          logs = [];
          logs.push({
            time: time,
            action: item.dwInoutMode
          });
          x++;
        }
      }
    });

    var data = records.map((item,i)=>{
      var subArr = [];
      item.logs.map((sub, a) => {
        var current = sub.action;
        if (typeof subArr[current.replace(' ', '')] == 'undefined') {
          subArr[current.replace(' ', '')] = sub.time;
        }
        subArr['date'] = item.date;
      });

      var totalDuration = moment.duration(moment(subArr['TimeOut']).diff(moment(subArr['TimeIn'])));
      var totalOvertimeDuration = moment.duration(moment(subArr['OvertimeOut']).diff(moment(subArr['OvertimeIn'])));
      
      var totalTime = totalDuration.hours() + "hrs " + totalDuration.minutes() + "mins ";
      var totalOvertime = totalOvertimeDuration.hours() + "hrs " + totalOvertimeDuration.minutes() + "mins ";

      return (
        <tr key={i}>
        <td>{subArr['date']}</td>
        <td>{typeof subArr['TimeIn'] != 'undefined'? subArr['TimeIn'].format("h:mm:ss A") : "--"}</td>
        <td>{typeof subArr['TimeOut'] != 'undefined'? subArr['TimeOut'].format("h:mm:ss A") : "--"}</td>
        <td>{typeof subArr['OvertimeIn'] != 'undefined'? subArr['OvertimeIn'].format("h:mm:ss A") : "--"}</td>
        <td>{typeof subArr['OvertimeOut'] != 'undefined'? subArr['OvertimeOut'].format("h:mm:ss A") : "--"}</td>
        <td>{totalTime}</td>
        <td>{totalOvertime}</td>
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
                      <th>Date</th>
                      <th>Time In</th>
                      <th>Time Out</th>
                      <th>Overtime In</th>
                      <th>Overtime Out</th>
                      <th>Total Hours</th>
                      <th>Total Overtime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data}
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
