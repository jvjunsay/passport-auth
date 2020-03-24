import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleSignin } from '../actions/index';

export class Header extends Component {
  renderButtons = () => {
    if (this.props.authenticated) {
      return (
        <>
          <div className='item'>
            <Link to='/signout' className='ui button'>
              Sign out
            </Link>
          </div>

          <div className='item'>
            <Link to='/feature' className='ui button'>
              Feature
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className='item'>
            <Link to='/signup' className='ui button'>
              Sign up
            </Link>
          </div>
          <div className='item'>
            <Link to='/signin' className='ui button'>
              Sign in
            </Link>
          </div>

          <div className='right menu'>
            <div className='item'>
              <a
                href='http://localhost:5000/auth/google'
                className='ui google plus button'
              >
                <i className='google icon' />
                Login with Google
              </a>
            </div>
          </div>
        </>
      );
    }
  };

  handleGoogleSignIn = () => {
    this.props.googleSignin();
  };

  render () {
    return (
      <div className='ui menu'>
        <div className='item'>
          <Link to='/' className='ui button'>
            Auth
          </Link>
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { authenticated: state.auth.authenticated };
};
export default connect(mapStatetoProps, { googleSignin })(Header);
