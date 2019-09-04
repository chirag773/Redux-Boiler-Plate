import {
    SET_CURRENT_USER,
    GET_ERRORS,
    USER_LOADING
  } from "../actions/types.js";
  
  import isEmpty from "../validation/isEmpty";
  
  const initialState = {
    isAuthenticated: false,
    loading: false,
    user: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  