export const MIN_PASSWORD_LENGTH = 6;

export const VALIDATION_MESSAGE = {
  VALID:
    'The email and password you entered did not match our records. Please double-check and try again.',
  EMAIL: {
    VALID: 'E-mail is not valid!',
    REQUIRED: 'E-mail is required!'
  },
  PASSWORD: {
    LENGTH: `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`,
    REQUIRED: 'Password is required!',
    MATCH: 'Passwords are not the same!',
    CONFIRM_REQUIRED: 'Password confirmation is required!'
  }
};
