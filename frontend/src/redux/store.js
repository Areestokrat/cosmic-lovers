import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import combineReducers from './reducers/rootReducer';

const store = createStore(
  combineReducers, 
  {
    isAuthenticated: window.localStorage.getItem('isAuth') || false,
  },
  applyMiddleware(reduxThunk),
);

export default store;
