import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_FILTER = "GET_FILTER";
export const GET_COUNTRY = "GET_COUNTRY";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const LIST_ACTIVITY = "LIST_ACTIVITY";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";

// TRAER TODOS LOS PAISES DEL BACKEND (DB)
export const getCountries = (value) => {
  return async function (dispatch) {
    let query = value ? value : "";
    var countries = await axios.get("http://localhost:3001/countries" + query);

    return dispatch({
      type: "GET_COUNTRIES",
      payload: countries.data,
    });
  };
};

export const getFilter = (value) => {
  return function (dispatch) {
    return dispatch({
      type: "GET_FILTER",
      payload: value,
    });
  };
};

export const getCountry = (idname) => {
  return async function (dispatch) {
    var country = await axios.get("http://localhost:3001/countries/" + idname);
    return dispatch({
      type: "GET_COUNTRY",
      payload: country.data,
    });
  };
};

export const searchCountry = (name) => {
  return function (dispatch) {
    return dispatch({
      type: "SEARCH_COUNTRY",
      payload: name,
    });
  };
};
export const createActivity = (activity) => {
  return async function (dispatch) {
    const addactivity = await axios.post(
      "http://localhost:3001/activity",
      activity
    );

    return addactivity;
  };
};

export const listActivity = () => {
  return async function (dispatch) {
    const listactivity = await axios.get("http://localhost:3001/activity");
    return dispatch({
      type: "LIST_ACTIVITY",
      payload: listactivity.data,
    });
  };
};

export const filterActivity = (activity) => {
  return async function (dispatch) {
    return dispatch({
      type: "FILTER_ACTIVITY",
      payload: activity,
    });
  };
};
