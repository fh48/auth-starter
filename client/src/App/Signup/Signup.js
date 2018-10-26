import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';

import {register} from '../../modules/api/auth.api';
import * as service from './service';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  handleSubmit = async (values, {setSubmitting, setFieldError}) => {
    try {
      await register(values.email, values.password);
      setSubmitting(false);
    } catch (errors) {
      errors.forEach(err => {
        setFieldError(err.field, err.error); // Map errors to fields
        //https://github.com/jaredpalmer/formik/issues/706
      });
    }
  };

  renderForm = props => {
    // Formik internal API, problematic with UI library components
    const {isSubmitting, errors, handleChange, handleSubmit} = props;

    return (
      <form className="form">
        <label className="form-field" htmlFor="email">
          <span>E-mail:</span>
          <input name="email" type="email" onChange={handleChange} />
        </label>
        <div className="form-field-error">{errors.email}</div>
        <label className="form-field" htmlFor="password">
          <span>Password:</span>
          <input name="password" type="password" onChange={handleChange} />
        </label>
        <div className="form-field-error">{errors.password}</div>

        <label className="form-field" htmlFor="passwordConfirmation">
          <span>Confirm password:</span>
          <input
            name="passwordConfirmation"
            type="password"
            onChange={handleChange}
          />
        </label>
        <div className="form-field-error">{errors.passwordConfirmation}</div>

        <button type="submit" onClick={handleSubmit} variant="contained">
          {isSubmitting ? 'Loading' : 'Signup'}
        </button>
      </form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={this.state}
        validate={service.validate(service.getValidationSchema)}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
      />
    );
  }
}
