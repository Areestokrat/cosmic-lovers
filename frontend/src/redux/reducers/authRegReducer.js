import { REGISTER_SUCCESSFUL, AUTH_SUCCESSFUL, LOGOUT } from '../actions/action-types';

const initialState = {
  isAuthenticated: false,
  userName: '',
  token: '',
}

const authRegReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        isAuthenticated: true,
      }
    case AUTH_SUCCESSFUL:
      window.localStorage.setItem('token', payload.token);
      window.localStorage.setItem('userName', payload.userName);
      return {
        ...state,
        isAuthenticated: true,
        userName: payload.userName,
        token: payload.token,
      }
    case LOGOUT:
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userName');
      return {
        ...state,
        isAuthenticated: false,
      }
    default: 
      return state;
  }
}

export default authRegReducer;
