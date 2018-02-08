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

import { Table, Icon, Divider } from 'antd';
import {post, get, _delete} from '~/src/utils/RestClient';

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      filter: '',
        logs: []
    }
  }


  logout=()=>{
    this.props.authActions.logout();
  }

  goBack=()=>{
    this.props.routerActions.goBack();
  }

  render(){

    var keys = Object.keys(this.props.profile.records)
    const datas = []
      if(keys)
      for (let i = 0; i <= keys.length; i++) {
          var item = this.props.profile.records[keys[i]];
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

      console.log(keys, "item")

      const columns = [{
          title: 'Name',
          key: 'name',
          render:()=> <a href="#">{this.props.profile.name}</a>,
      },{
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
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
        <Table columns={columns} rowKey={(item)=> item.key} dataSource={datas} />
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
