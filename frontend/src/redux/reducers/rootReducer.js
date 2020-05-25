import {combineReducers} from 'redux';
import authRegReducer from './authRegReducer';
import apodReducer from './apodReducer';

export default combineReducers({
  authRegReducer,
  apodReducer,
});
