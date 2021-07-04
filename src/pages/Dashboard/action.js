/* eslint-disable import/prefer-default-export */
import { LOADING, DATA_FETCHED } from './constants';

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function dataFetchedAction(data) {
  return { type: DATA_FETCHED, data };
}

export function fetchData(payload) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    try {
      const data = payload();
      dataFetchedAction(data);
    } catch (err) {
      console.log(err);
    }
  };
}
