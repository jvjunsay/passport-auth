import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signin } from '../../actions';

class Signin extends Component {
  onSubmit = values => {
    this.props.signin(values);
  };

  render () {
    return (
      <div>
        <form
          className='ui form'
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <div className='field'>
            <label>Email</label>
            <Field
              name='email'
              component='input'
              type='email'
              placeholder='Email Address'
            />
          </div>
          <div className='field'>
            <label>Password</label>
            <Field
              name='password'
              component='input'
              type='password'
              placeholder='password'
            />
          </div>
          <div>
            {this.props.errorMessage}
          </div>
          <button className='ui button' type='submit'>
            SignIn
          </button>
        </form>
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
)(reduxForm({ form: 'signin' })(Signin));

export default conn;
