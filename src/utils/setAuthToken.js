import axios from "axios";

const setAuthToken = access_token => {
  if (access_token) {
    // apply to every request
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  } else {
    // delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;