import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signup } from '../../actions';

class Signup extends Component {
  onSubmit = values => {
    this.props.signup(values);
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
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
};

const mapDispatchToProps = { signup };

const conn = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'signup' })(Signup));

export default conn;
