import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.css';
import UserForm from './forms/UserForm';
import { signup } from '../../actions';

export class Signup extends Component {
  handleSubmit = values => {
    this.props.signup(values);
  };

  render () {
    return (
      <div
        className='ui middle aligned center aligned grid'
        style={{ height: '100vh' }}
      >
        <div className='column'>
          <h2 className='ui teal image header'>
            <div className='content'>Create an account</div>
          </h2>
          <UserForm onSubmit={this.handleSubmit} buttonName='Sign Up'>
            <div>{this.props.errorMessage}</div>
            <a
              style={{ marginTop: '10px' }}
              href='/auth/google'
              className='ui fluid large google plus button'
            >
              <i className='google icon' />
              Signup with Google
            </a>
          </UserForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
};

const mapDispatchToProps = { signup };

const conn = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default conn;
