import React from 'react';
import {shallow} from 'enzyme';

import Signup from './Signup.js';

describe('Signup', () => {
  let node;
  it('should match snapshot', () => {
    node = shallow(<Signup />);
    expect(node.debug()).toMatchSnapshot();
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

  it('should render Formik', () => {
    //
  });

  it('should handle the form submit', () => {
    //
  });

  it('should set initial values ', () => {
    //
  });

  it('should set initial values after submit again', () => {
    //
  });
});
