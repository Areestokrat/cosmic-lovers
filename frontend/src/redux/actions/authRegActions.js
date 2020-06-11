import { REGISTER_SUCCESSFUL, AUTH_SUCCESSFUL, LOGOUT } from './action-types';

export function authAction(authData) {
  return {
    type: AUTH_SUCCESSFUL,
    payload: authData,
  }
};

export function registerAction() {
  return {
    type: REGISTER_SUCCESSFUL,
  }
};

export function logout() {
  return {
    type: LOGOUT,
  }
};
