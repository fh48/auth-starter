import {VALIDATION_MESSAGE} from '../../modules/constants';
import * as yup from 'yup';

export const getValidationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email(VALIDATION_MESSAGE.EMAIL.VALID)
      .required(VALIDATION_MESSAGE.EMAIL.REQUIRED),
    password: yup.string().required(VALIDATION_MESSAGE.PASSWORD.REQUIRED)
  });
