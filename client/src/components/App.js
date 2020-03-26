import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Feature from './Feature';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import history from '../history';
import queryString from 'query-string';
import { currentUser } from '../actions';
import './style.css';
import Layout from './Layout';
import LoginForm from './auth/LoginForm';

export class App extends Component {
  componentDidMount () {
    const query = queryString.parse(window.location.search);
    if (query.token) {
      window.localStorage.setItem('mtoken', query.token);
      this.props.currentUser({ token: query.token });
      window.location = '/feature';
    } else if (window.localStorage.getItem('mtoken')) {
      this.props.currentUser({ token: window.localStorage.getItem('mtoken') });
    }
  }

  render () {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path='/' exact component={Layout} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={LoginForm} />
            <Route path='/signout' exact component={Signout} />
            <Route path='/feature' exact component={Feature} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

const mapDispatchToProps = { currentUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);
