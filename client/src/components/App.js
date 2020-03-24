import React, { Component } from 'react';
import Header from './Header';
import { Router, Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import Feature from './Feature';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import Signin from './auth/Signin';
import history from '../history';
import queryString from 'query-string';

export class App extends Component {
  componentWillMount () {
    const query = queryString.parse(window.location.search);
    if (query.token) {
      window.localStorage.setItem('mtoken', query.token);
      window.location = '/feature';
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

export default App;
