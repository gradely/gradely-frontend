import axios from "axios";
import { urlHash } from "@/services/service-route";
import { API_VERSION } from "@/env";

class serviceApi {
  base = "old";
  url = "";

  // GENERATE BASE URL
  service(module = this.base) {
    this.url =
      module === "old" ? `/${API_VERSION}` : `/${module}/${API_VERSION}`;
    return this;
  }

  // APEND URL TO BASE API
  appendToBase(url) {
    return (this.url += url);
  }

  // GET API REQUEST
  async fetch(url) {
    try {
      let response = await axios.get(
        urlHash(this.appendToBase(url)),
        this.setupHeaders(false)
      );
      return response.data;
    } catch (err) {
      this.handleErrors(err);
    }
  }

  // POST API REQUEST
  async push(url, payload = null, is_attach = false) {
    try {
      let response = await axios.post(
        this.appendToBase(url),
        payload,
        this.setupHeaders(is_attach)
      );
      return response.data;
    } catch (err) {
      this.handleErrors(err);
    }
  }

  // UPDATE API REQUEST
  async update(url, payload = {}, is_attach = false) {
    try {
      let response = await axios.put(
        this.appendToBase(url),
        payload,
        this.setupHeaders(is_attach)
      );
      return response.data;
    } catch (err) {
      this.handleErrors(err);
    }
  }

  // DELETE API REQUEST
  async remove(url, payload = {}) {
    try {
      let response = await axios.delete(
        this.appendToBase(url),
        payload,
        this.setupHeaders(false)
      );
      return response.data;
    } catch (err) {
      this.handleErrors(err);
    }
  }

  // HABDLE API REQUEST ERRORS
  async handleErrors(err) {
    console.log(err.response);
    return false;
  }

  // SETUP REQUEST
  setupHeaders(attach) {
    return attach
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("gradelyAuthToken")}`,
          },
        }
      : {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("gradelyAuthToken")}`,
          },
        };
  }
}

export const $serviceApi = new serviceApi();
