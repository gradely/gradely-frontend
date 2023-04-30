import axios from "axios";
import { urlHash } from "@/services/service-route";
import store from "@/store";
import {
  API_VERSION,
  API_BASE_URL,
  NEW_API_VERSION,
  NEW_API_BASE_URL,
} from "@/env";

import NProgress from "vue-nprogress";
const nprogress = new NProgress();

// SERVICE API CLSS
class serviceApi {
  base = "report";
  url = "";

  verionlessService() {
    axios.defaults.baseURL = `${API_BASE_URL}`;
    this.url = "";
    return this;
  }

  // GENERATE BASE URL
  service(module = this.base) {
    axios.defaults.baseURL = `${API_BASE_URL}/`;
    this.injectTokenInterceptor();

    this.url =
      module === "old" ? `/${API_VERSION}` : `/${module}/${API_VERSION}`;
    return this;
  }

  // CALL THIS SERVICE FOR NEW VERSION 2.1 API'S
  newService(module = this.base) {
    axios.defaults.baseURL = `${NEW_API_BASE_URL}/`;
    // this.injectTokenInterceptor();

    this.url =
      module === "old"
        ? `/${NEW_API_VERSION}`
        : `/${module}/${NEW_API_VERSION}`;
    return this;
  }

  // APEND URL TO BASE API
  appendToBase(url) {
    return (this.url += url);
  }

  // GET API REQUEST
  async fetch(url, sub_token = false) {
    try {
      let response = await axios.get(
        urlHash(this.appendToBase(url)),
        this.setupHeaders(false, sub_token)
      );
      return response.data;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // POST API REQUEST
  async push(
    url,
    payload = null,
    resolve = true,
    is_attach = false,
    sub_token = false
  ) {
    try {
      let response = await axios.post(
        this.appendToBase(url),
        payload,
        this.setupHeaders(is_attach, sub_token)
      );
      return resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // UPDATE API REQUEST
  async update(url, payload = {}, is_attach = false, sub_token = false) {
    try {
      let response = await axios.put(
        this.appendToBase(url),
        payload,
        this.setupHeaders(is_attach, sub_token)
      );
      return response.data;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // DELETE API REQUEST
  async remove(url, payload = {}) {
    try {
      let response = await axios.delete(this.appendToBase(url), {
        data: payload,
        ...this.setupHeaders(),
      });

      return response.data;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // HABDLE API REQUEST ERRORS
  async handleErrors(err) {
    // console.log(err.response);
    nprogress.done();
    return err.response;
  }

  // SETUP REQUEST
  setupHeaders(attach = false, sub_token = false) {
    return attach
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: sub_token
              ? `Bearer ${localStorage.getItem("gradelyAuthSubToken")}`
              : `Bearer ${localStorage.getItem("gradelyAuthToken")}`,
          },
        }
      : {
          headers: {
            Authorization: sub_token
              ? `Bearer ${localStorage.getItem("gradelyAuthSubToken")}`
              : `Bearer ${localStorage.getItem("gradelyAuthToken")}`,
          },
        };
  }

  // AXIOS INTERCEPTOR
  injectTokenInterceptor() {
    axios.interceptors.request.use((config) => {
      nprogress.start();
      nprogress.inc(0.3);
      return config;
    });

    axios.interceptors.response.use(
      async (response) => {
        nprogress.done();
        return await response;
      },

      // ERROR RESPONSE
      async (error) => {
        const originalConfig = error.config;

        if (error.response) {
          if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            // GENERATE NEW TOKEN
            store.dispatch("auth/generateTokenSet");
            return this.axiosInstance(originalConfig);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // RETURN DATA SAVED IN STORE
  deliverFromStore(data = [], pagination = {}) {
    return {
      code: 200,
      data,
      pagination,
    };
  }
}

export const $serviceApi = new serviceApi();
