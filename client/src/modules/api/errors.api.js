// import {store} from '../../index';
// import {AUTH_ACTION_TYPE} from '../constants';

export const handleErrors = response => {
  if (!response.success) {
    if (response.code && response.code === 'invalidToken') {
      //   store.dispatch({type: AUTH_ACTION_TYPE.INVALID_TOKEN});
    } else if (response.code && response.code === 'refreshExpired') {
      //   store.dispatch({type: AUTH_ACTION_TYPE.REFRESH_EXPIRED});
    }
    throw Error(response.message);
  }
  return response;
};
