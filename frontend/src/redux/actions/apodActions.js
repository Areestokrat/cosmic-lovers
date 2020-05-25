import { APOD_LOADING, APOD_LOADED, APOD_ERROR } from './action-types';

export function apodLoading() {
  return {
    type: APOD_LOADING,
  }
}

export function apodLoaded(url) {
  return {
    type: APOD_LOADED,
    payload: url,
  }
}

export function apodError(err) {
  return {
    type: APOD_ERROR,
    payload: err,
  }
}

export function loadApod() {
  return async function (dispatch) {
    dispatch(apodLoading());
    try {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=uVuC9iZ59HoxI55ecV7rvoUToQjuWl5exc1EeA7L');
      const { hdurl } = await response.json();
      // console.log(hdurl)
      const img = new Image();
      img.src = hdurl;
      img.onload = () => dispatch(apodLoaded(hdurl));
    } catch (err) {
      dispatch(apodError(err));
      window.alert(err);
    }

  }
}
