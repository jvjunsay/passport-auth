import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class UserForm extends Component {
  renderError = (touched, error) => {
    if (touched && error) {
      return (
        <div className='ui pointing red basic label'>
          {error}
        </div>
      );
    }
  };

  renderInput = ({ input, icon, type, label, meta: { touched, error } }) => {
    const className = `field ${error && touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <div className='ui left icon input'>
          <i className={`icon ${icon}`} />
          <input
            {...input}
            autoComplete='off'
            type={type}
            placeholder={label}
          />
        </div>
        {this.renderError(touched, error)}
      </div>
    );
  };

  handleSubmit = values => {
    this.props.onSubmit(values);
  };

  render () {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
        className='ui form  large error'
      >
        <div className='ui segment'>
          <Field
            label='Email'
            type='email'
            name='Email'
            icon='user'
            component={this.renderInput}
          />
          <Field
            label='Password'
            type='password'
            icon='lock'
            name='Password'
            component={this.renderInput}
          />

          <button className='ui fluid large teal submit button'>
            {this.props.buttonName}
          </button>

          {this.props.children}
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.Email) {
    errors.Email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
    errors.Email = 'Invalid email address';
  }

  if (!values.Password) {
    errors.Password = 'Required';
  } else if (values.Password.length < 8) {
    errors.Password = 'Must be 8 characters or more';
  }

  return errors;
};

export default reduxForm({
  form: 'userForm',
  validate
})(UserForm);
