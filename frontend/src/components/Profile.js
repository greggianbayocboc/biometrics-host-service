/**
* Created by albertoclarit on 9/2/16.
*/
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profileActions';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';
import _ from 'lodash'
import moment from 'moment';

import { Table, Icon, Divider ,Spin,Button,Row,Col} from 'antd';
import {post, get, _delete} from '~/src/utils/RestClient';

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      filter: '',
        logs: [],
        groupedLogs: [],
        isLoading: false
    }
  }

  componentDidMount(){
      this.setState({
          isLoading: true
      })
      get('/api/bundyclock/getlogsbyenrollnoForSirJohn?enrollno=' + this.props.params.id).then((response)=>{

          var records = response.data;

          this.setState({
              groupedLogs: records,
              isLoading:false
          })


      });
  }


  logout=()=>{
    this.props.authActions.logout();
  }

  goBack=()=>{
    this.props.routerActions.goBack();
  }
    expandedRowRender = (record) => {
        const columns = [
            { title: 'Type', dataIndex: 'dwInoutMode', key: 'dwInoutMode' },
            { title: 'Time', dataIndex: 'time', key: 'time' }
        ];
        console.log("RECORD",record)
        var list = record.logs.map((log, i)=>{
            return {
                dwInoutMode: log.dwInoutMode,
                time: log.time
            }
        })
        console.log("LIST",list)
        if(list.length>0)
        {
            return (
                <Table
                    columns={columns}
                    dataSource={list}
                    pagination={false}
                    size="small"
                    bordered
                />
            );
        }
        else {
            return <span>No data on this date.</span>;
        }
    };

  render(){

    var keys = Object.keys(this.state.logs)


      const columns = [{
          title: 'Date',
          dataIndex: 'date',
          key: 'date'
            }];
    return(
        <div >
            <h1 style={{marginLeft: "10px"}}> {this.props.params.name}</h1>
            <Row>
                <Col span={24}>
                    <Spin spinning={this.state.isLoading}>
                        <Table columns={columns} dataSource={this.state.groupedLogs}  expandedRowRender={this.expandedRowRender}/>
                    </Spin>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{textAlign: "right"}}>
                    <Button type={"danger"} onClick={this.goBack} style={{marginTop: "10px",marginLeft: "10px"}}>
                        Back
                    </Button>
                </Col>
            </Row>

        </div>


    )
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
