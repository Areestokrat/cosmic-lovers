import { APOD_LOADING, APOD_LOADED, APOD_ERROR } from '../actions/action-types';

const initialState = {
  loading: false,
  url: false,
  error: false,
};

const apodReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case APOD_LOADING: 
      return {
        ...state,
        loading: true,
        url: false,
        error: false,
      };
    case APOD_LOADED: 
      return {
        ...state,
        loading: false,
        url: payload.hdurl,
        title: payload.title,
        error: false,
      };
    case APOD_ERROR:
      return {
        ...state,
        loading: false,
        url: false,
        error: payload,
      };
    default: {
      return state;
    }
  }
  
};

export default apodReducer;
