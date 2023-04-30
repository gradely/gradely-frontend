// this would consist of axios factory for creating the instance

import axios from "axios";
import { API_BASE_URL, API_VERSION } from "../../env";

// Create instance called instance....
const Instance = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`
});

const responseSuccessHandler = (response) => {
  return response;
};

const responseErrorHandler = (error) => {
  console.log("this is an error from axios interceptor YOUR TOKEN EXPIRED!!!");
  // if (error.response.status === 401) {
  // }

  return Promise.reject(error);
};

axios.interceptors.response.use(
  (response) => responseSuccessHandler(response),
  (error) => responseErrorHandler(error)
);

export default Instance;
