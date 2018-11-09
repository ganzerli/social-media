import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // apply for everyrequest
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete the header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
