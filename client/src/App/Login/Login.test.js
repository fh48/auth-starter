import React from 'react';
import {shallow} from 'enzyme';

import Login from './Login';
import {Formik} from 'formik';
import {find} from 'async';

describe('Login', () => {
  let node;
  beforeEach(() => {
    node = shallow(<Login />);
  });

  it('should match formik snapshot', () => {
    expect(node).toMatchSnapshot();
  });

  it('should match form snapshot', () => {
    const form = node.instance().renderForm({
      isSubmitting: false,
      errors: {},
      handleChange: jest.fn(),
      handleSubmit: jest.fn()
    });

    expect(form).toMatchSnapshot();
  });

  it('should pass the form to Formik', () => {
    const renderMethod = node.instance().renderForm;
    expect(node.find(Formik).props().render).toEqual(renderMethod);
  });

  it('should render Formik', () => {
    expect(node.find(Formik).exists()).toBe(true);
  });

  it('should handle the form submit', () => {
    //
  });

  it('should pass the login data to api', () => {
    // call the login method.
  });

  it('should set initial values ', () => {
    //
  });
});
