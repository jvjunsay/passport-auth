import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { Router, Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import Feature from './Feature';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import Signin from './auth/Signin';
import history from '../history';
import queryString from 'query-string';
import { currentUser } from '../actions';

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
      <div className='ui container'>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/signout' exact component={Signout} />
            <Route path='/feature' exact component={Feature} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    state
  };
};

const mapDispatchToProps = { currentUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);
