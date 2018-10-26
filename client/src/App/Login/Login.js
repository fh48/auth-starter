import React, {Component} from 'react';
import {Formik} from 'formik';

import {login} from '../../modules/api/auth.api';

import * as service from './service';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async (values, {setSubmitting, setErrors}) => {
    try {
      // await login(values.email, values.password);
      console.log('User has been sucessfully logged in !', values);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      // from docs: setErrors: (fields: { [field: string]: string }) => void
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

        <button type="submit" onClick={handleSubmit} variant="contained">
          {isSubmitting ? 'Loading' : 'Login'}
        </button>
      </form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={this.state}
        validationSchema={service.getValidationSchema}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
      />
    );
  }
}
