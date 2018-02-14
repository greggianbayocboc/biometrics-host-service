/**
* Created by albertoclarit on 1/9/16.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../stores/configureStore'
import { syncHistoryWithStore } from 'react-router-redux'
import {
  Route,
  IndexRoute,
  Router,
  IndexRedirect
}  from 'react-router';
import {requireAuthentication} from '../utils/AuthUtils'

require('../fonts/sourcesanspro/css/fonts.css');
require('font-awesome/css/font-awesome.css');
require('../styles/css/main.css');
import 'antd/dist/antd.css';

import Index from '../components/Index'
import Login from '../components/Login'
import AccessDenied from '../components/AccessDenied'
import SecurePage from '../components/SecurePage'
import SuccessPage from '../components/SuccessPage'
import Employee from '../components/Employee'
import Profile from '../components/Profile'
import Settings from '../components/Settings'
import RegisterUser from '../components/RegisterUser'
import RegisterEmployee from '../components/RegisterEmployee'

var initialState={

};

const store = configureStore(initialState,browserHistory);
const enhanceHistory = syncHistoryWithStore(browserHistory,store);

var Routes = (
  <Provider store={store}>
    <Router history={enhanceHistory}>
      <Route path ="/" component={App}>
        <IndexRoute component={requireAuthentication(Employee,'ROLE_USER')}/>
        <Route path ="login" component={Login}/>
        <Route path ="accessdenied" component={AccessDenied}/>
        <Route path ="success" component={SuccessPage}/>
        <Route path ="secure" component={requireAuthentication(SecurePage,'ROLE_USER')}/>
        <Route path ="employee" component={requireAuthentication(Employee,'ROLE_ADMIN')}/>
        <Route path ="profile/:name/:id" component={requireAuthentication(Profile,'ROLE_USER')}/>
        <Route path ="settings" component={requireAuthentication(Settings,'ROLE_ADMIN')}/>
        <Route path ="adduser" component={requireAuthentication(RegisterUser,'ROLE_ADMIN')}/>
        <Route path ="addemployee" component={requireAuthentication(RegisterEmployee,'ROLE_ADMIN')}/>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(Routes, document.getElementById('app'));
