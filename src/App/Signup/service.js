import * as yup from 'yup';

import {MIN_PASSWORD_LENGTH, VALIDATION_MESSAGE} from '../../modules/constants';

export const getValidationSchema = values =>
  yup.object().shape({
    email: yup
      .string()
      .email(VALIDATION_MESSAGE.EMAIL.VALID)
      .required(VALIDATION_MESSAGE.EMAIL.REQUIRED),
    password: yup
      .string()
      .min(MIN_PASSWORD_LENGTH, VALIDATION_MESSAGE.PASSWORD.LENGTH)
      .required(VALIDATION_MESSAGE.PASSWORD.REQUIRED),
    passwordConfirmation: yup
      .string()
      .oneOf([values.password], VALIDATION_MESSAGE.PASSWORD.MATCH)
      .required(VALIDATION_MESSAGE.PASSWORD.CONFIRM_REQUIRED)
  });

// Used to validate passwordConfirmation
export const validate = getValidationSchema => {
  return values => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, {abortEarly: false});
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

//Transforms in the form standard form.
const getErrorsFromValidationError = validationError => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR]
    };
  }, {});
};
