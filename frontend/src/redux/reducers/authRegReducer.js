import { REGISTER_SUCCESSFUL, AUTH_SUCCESSFUL, LOGOUT } from '../actions/action-types';

const initialState = {
  isAuthenticated: false,
  userName: '',
}

const authRegReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESSFUL:
      window.localStorage.setItem('isAuth', 'true')
      window.localStorage.setItem('userName', payload)
      return {
        ...state,
        isAuthenticated: true,
        userName: payload,
      }
    case AUTH_SUCCESSFUL:
      window.localStorage.setItem('isAuth', 'true')
      window.localStorage.setItem('userName', payload)
      return {
        ...state,
        isAuthenticated: true,
        userName: payload,
      }
    case LOGOUT:
      window.localStorage.removeItem('isAuth');
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
