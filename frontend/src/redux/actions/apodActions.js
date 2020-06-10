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

export function loadApod(date = null) {
  return async function (dispatch) {
    dispatch(apodLoading());
    try {
      if (date) {
        const fetchDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=uVuC9iZ59HoxI55ecV7rvoUToQjuWl5exc1EeA7L&date=${fetchDate}`;
        const response = await fetch(apodUrl);
        const { hdurl } = await response.json();
        const img = new Image();
        img.src = hdurl;
        img.onload = () => dispatch(apodLoaded(hdurl));
      } else {
        const apodUrl = 'https://api.nasa.gov/planetary/apod?api_key=uVuC9iZ59HoxI55ecV7rvoUToQjuWl5exc1EeA7L';
        const response = await fetch(apodUrl);
        const { hdurl } = await response.json();
        const img = new Image();
        img.src = hdurl;
        img.onload = () => dispatch(apodLoaded(hdurl));
      }
    } catch (err) {
      dispatch(apodError(err));
      window.alert(err);
    }

  }
}
