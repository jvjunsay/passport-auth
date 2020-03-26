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
import EmptyLayout from './EmptyLayout';
import LoginForm from './auth/LoginForm';
import Dashboard from './contents/Dashboard';
import Blog from './contents/Blog';

export class App extends Component {
  componentDidMount () {
    const query = queryString.parse(window.location.search);
    if (query.token) {
      window.localStorage.setItem('mtoken', query.token);
      this.props.currentUser({ token: query.token });
      window.location = '/';
    } else if (window.localStorage.getItem('mtoken')) {
      this.props.currentUser({ token: window.localStorage.getItem('mtoken') });
    }
  }

  renderWithLayOut = (Path, Component, Layout) => {
    return (
      <Layout>
        <Route path={Path} component={Component} />
      </Layout>
    );
  };

  renderWithLoginLayout (Component, LoginLayout) {
    return (
      <LoginLayout>
        <Component />
      </LoginLayout>
    );
  }

  render () {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path='/'
              render={() => this.renderWithLayOut(this.path, Dashboard, Layout)}
            />
            <Route
              exact
              path='/blog'
              render={() => this.renderWithLayOut(this.path, Blog, Layout)}
            />
            <Route
              path='/signin'
              render={() => this.renderWithLoginLayout(LoginForm, EmptyLayout)}
            />

            <Route
              path='/signup'
              render={() => this.renderWithLoginLayout(Signup, EmptyLayout)}
            />

            <Route
              path='/signout'
              render={() => this.renderWithLoginLayout(Signout, EmptyLayout)}
            />

            <Route
              path='/feature'
              render={() => this.renderWithLoginLayout(Feature, EmptyLayout)}
            />
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
