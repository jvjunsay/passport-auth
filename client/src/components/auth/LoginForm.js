import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.css';
import UserForm from './forms/UserForm';
import { signin } from '../../actions';
import { Link } from 'react-router-dom';

export class LoginForm extends Component {
  handleSubmit = values => {
    this.props.signin(values);
  };

  render () {
    return (
      <div
        className='ui middle aligned center aligned grid'
        style={{ height: '100vh' }}
      >
        <div className='column'>
          <h2 className='ui teal image header'>
            <div className='content'>Log-in to your account</div>
          </h2>
          <UserForm onSubmit={this.handleSubmit} buttonName='Login' />
          <div>{this.props.errorMessage}</div>
          <a style={{ marginTop: '10px' }} href='/auth/google' className='ui fluid large google plus button'>
            <i className='google icon' />
            Signin with Google
          </a>
          <div className='ui message'>
            New to us? <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
};

const mapDispatchToProps = { signin };

const conn = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default conn;
