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

class DTRSidebar extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-nav-container'>
                <SidebarNav>
                  <div className='sidebar-header'>Daily Time Record</div>
                  <li tabIndex="-1" className="sidebar-nav-item">
                    <a tabIndex="-1"><span className="icon-fontello-gauge rubix-icon">
                      </span><span className="name">Secure Page</span>
                    </a>
                  </li>
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class PayrollSidebar extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className='sidebar-header'>DUMMY SIDEBAR</div>
            <LoremIpsum query='1p' />
          </Col>
        </Row>
      </Grid>
    );
  }
}

class SidebarContainer extends React.Component {
  constructor(props){
      super(props);
  }

  goSecure = ()=>{
      this.props.routerActions.push("/secure");
  }

  goEmployee = ()=>{
      this.props.routerActions.push("/employee");
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
          <SidebarControlBtn bundle='fontello' glyph='chart' sidebar={1} />
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
                          <a tabIndex="-1" onClick={this.goSecure}><span className="icon-fontello-lock rubix-icon">
                            </span><span className="name">Secure Page</span>
                          </a>
                        </li>
                        <li tabIndex="-1" className="sidebar-nav-item">
                          <a tabIndex="-1" onClick={this.goEmployee}><span className="icon-fontello-users rubix-icon">
                            </span><span className="name">Employee</span>
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
                      <div className='sidebar-header'>Payroll</div>
                      <li tabIndex="-1" className="sidebar-nav-item">
                        <a tabIndex="-1" onClick={this.goSecure}><span className="icon-fontello-lock rubix-icon">
                          </span><span className="name">Sample page</span>
                        </a>
                      </li>
                      <li tabIndex="-1" className="sidebar-nav-item">
                        <a tabIndex="-1" onClick={this.goEmployee}><span className="icon-fontello-users rubix-icon">
                          </span><span className="name">Sample page</span>
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
