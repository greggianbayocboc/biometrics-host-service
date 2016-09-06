import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Link, withRouter } from 'react-router';

import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';

import {
  Label,
  SidebarBtn,
  Dispatcher,
  NavDropdown,
  NavDropdownHover,
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  Badge,
  Button,
  Icon,
  Grid,
  Row,
  Radio,
  Col } from '@sketchpixy/rubix';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/authactions';
import { routerActions } from 'react-router-redux';

class Brand extends React.Component {
  render() {
    return (
      <Navbar.Header {...this.props}>
        <Navbar.Brand tabIndex='-1'>
          <a href='/'>HISD3</a>
        </Navbar.Brand>
      </Navbar.Header>
    );
  }
}

class Header extends React.Component {
  constructor(props){
      super(props);
  }

  logout=()=>{
      this.props.authActions.logout();
  }

  render() {
    return (
      <Grid id='navbar'>
        <Row>
          <Col xs={12}>
            <Navbar fixedTop fluid id='rubix-nav-header'>
              <Row>
                <Col xs={3} visible='xs'>
                  <SidebarBtn />
                </Col>
                <Col xs={6} sm={4}>
                  <Brand />
                </Col>
                <Col xs={3} sm={8} collapseRight className='text-right'>
                  <Nav pullRight>
                    <Nav>
                      <NavItem className='logout' onClick={this.logout}>
                        <Icon bundle='fontello' glyph='off-1' />
                      </NavItem>
                    </Nav>
                  </Nav>
                </Col>
              </Row>
            </Navbar>
          </Col>
        </Row>
      </Grid>
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

export default connect(mapStateToProps,mapDispatchToProps)(Header);
