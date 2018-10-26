import {SERVER_URL, configHeaders} from './../../config';
import {handleErrors} from './errors.api';

export const login = ({email, password}) => {
  return fetch(`${SERVER_URL}/auth/login`, {
    method: 'POST',
    headers: configHeaders,
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => response.json())
    .then(handleErrors)
    .catch(error => {
      throw error;
    });
};

export const register = ({email, password}) =>
  fetch(`${SERVER_URL}/auth/register`, {
    method: 'POST',
    headers: configHeaders,
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => response.json())
    .then(handleErrors)
    .catch(error => {
      throw error;
    });
