import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider
} from '@sketchpixy/rubix';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

class SidebarContainer extends React.Component {
  constructor(props){
      super(props);
  }

  goEmployee = ()=>{
      this.props.routerActions.push("/employee");
  }

  goSettings = ()=>{
      this.props.routerActions.push("/settings");
  }

  render() {
    return (
      <div id='sidebar'>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='../../public/imgs/app/avatars/avatar0.png' width='40' height='40' />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>{this.props.auth.account.firstName} {this.props.auth.account.lastName}</div>
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='calendar' sidebar={0} />
          <SidebarControlBtn bundle='fontello' glyph='user' sidebar={1} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <div>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <div className='sidebar-nav-container'>
                      <SidebarNav>
                        <div className='sidebar-header'>Daily Time Record</div>
                        <li tabIndex="-1" className="sidebar-nav-item">
                          <a tabIndex="-1" onClick={this.goEmployee}><span className="icon-fontello-users rubix-icon">
                            </span><span className="name">Employees</span>
                          </a>
                        </li>
                        <li tabIndex="-1" className="sidebar-nav-item">
                          <a tabIndex="-1" onClick={this.goSettings}><span className="icon-fontello-cog rubix-icon">
                          </span><span className="name">Settings</span>
                          </a>
                        </li>
                      </SidebarNav>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </div>
          </Sidebar>
          <Sidebar sidebar={1}>
          <div>
            <Grid>
              <Row>
                <Col xs={12}>
                  <div className='sidebar-nav-container'>
                    <SidebarNav>
                      <div className='sidebar-header'>Account</div>
                      <li tabIndex="-1" className="sidebar-nav-item">
                        <a tabIndex="-1" onClick={this.goSecure}><span className="icon-fontello-cogs rubix-icon">
                        </span><span className="name">Account Settings</span>
                        </a>
                      </li>
                    </SidebarNav>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
          </Sidebar>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        auth:state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SidebarContainer);
