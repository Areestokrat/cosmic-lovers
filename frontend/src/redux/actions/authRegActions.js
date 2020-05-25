import { REGISTER_SUCCESSFUL, AUTH_SUCCESSFUL, LOGOUT } from './action-types';

export function authAction(userName) {
  return {
    type: AUTH_SUCCESSFUL,
    payload: userName,
  }
};

export function registerAction(userName) {
  return {
    type: REGISTER_SUCCESSFUL,
    payload: userName,
  }
};

export function logout() {
  return {
    type: LOGOUT,
  }
};
