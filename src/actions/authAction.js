import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { Alert } from "react-native";
import { AsyncStorage } from "react-native";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const loginUser = formBody => dispatch => {
  axios({
    method: "post",
    url: "Your_api",
    withCredentials: true,
    crossdomain: true,
    data: formBody,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache"
    }
  })
    .then(response => {
      dispatch(userLoading());

      console.log("this console is coming from autactions");

      //save data to variable data
      let data = response.data;

      // // save user token to local storage
      const access_token = response.data.access_token;

      //stringfy data before storing
      const newData = JSON.stringify(data);

      //set newdata to asyncstorage
      AsyncStorage.setItem("jwtToken", newData);

      // console.log new data
      console.log(newData);

      // set token to auth header i.e authorization
      setAuthToken(access_token);

      dispatch(setCurrentUser(newData));
    })
    //if error dispatch the error
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const userLoading = () => {
  return {
    type: USER_LOADING
  };
};

//   //set lgged in user

export const setCurrentUser = newData => {
  return {
    type: SET_CURRENT_USER,
    payload: newData
  };
};

//   //logout user

export const logoutuser = () => dispatch => {
  // remove token from local storage
  AsyncStorage.removeItem("jwtToken");

  //remove auth header for duture authorization
  setAuthToken(false);

  //set current User to empty oject so isAuthentication wll become false
  dispatch(setCurrentUser({}));
};