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
        isLoading: false
    }
  }

  componentDidMount(){
      this.setState({
          isLoading: true
      })
      get('/api/bundyclock/getlogsbyenrollnov2?enrollno=' + this.props.params.id).then((response)=>{

          var records = response.data;

          this.setState({
              logs: records,
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

  render(){

    var keys = Object.keys(this.state.logs)
    const datas = []
      if(keys)
      for (let i = 0; i <= keys.length; i++) {
          var item = this.state.logs[keys[i]];
          if(item){
              console.log(item, "item")
              datas.push({
                  key: i,
                  date: item.date,
                  timein: item.timein,
                  timeout:item.timeout,
              });
          }

      }

      console.log(datas, "item")

      const columns = [{
          title: 'Name',
          key: 'name',
          render:()=> <a href="#">{this.props.params.name}</a>,
      },{
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          sortOrder:"descend",
          sorter: (a, b) => moment.utc(moment(a.date, "MM/DD/YYYY")).diff(moment.utc(moment(b.date,"MM/DD/YYYY"))),
      }, {
          title: 'Time in',
          dataIndex: 'timein',
          key: 'timein',
      }, {
          title: 'Time out',
          dataIndex: 'timeout',
          key: 'timeout',
      }];
    return(
        <div >
            <h1 style={{marginLeft: "10px"}}> {this.props.params.name}</h1>
            <Row>
                <Col span={24}>
                    <Spin spinning={this.state.isLoading}>
                        <Table columns={columns} rowKey={(item)=> item.key} dataSource={datas} />
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
