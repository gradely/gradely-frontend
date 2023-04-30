import { getLocalStorage } from "../localStorageMgt";
import Instance from "./axios.instance";

const defaultHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${getLocalStorage("gradelyAuthToken")}`
};

// get verb for api call
const getData = async (urlParam, optionalHeaders = {}) =>
  await Instance.get(urlParam, {
    headers: { ...defaultHeader, ...optionalHeaders }
  });

//   post verb for api-call
const postData = async (urlParam, data = {}, optionalHeaders = {}) =>
  await Instance.post(urlParam, data, {
    headers: { ...defaultHeader, ...optionalHeaders }
  });

//   delete verb for api-call
const deleteData = async (urlParam, optionalHeaders = {}) =>
  await Instance.delete(urlParam, {
    headers: { ...defaultHeader, ...optionalHeaders }
  });

//   patch verb

const patchData = async (urlParam, data = {}, optionalHeaders = {}) =>
  await Instance.patch(urlParam, data, {
    headers: { ...defaultHeader, ...optionalHeaders }
  });

//   patch verb

const putData = async (urlParam, data = {}, optionalHeaders = {}) =>
  await Instance.put(urlParam, data, {
    headers: { ...defaultHeader, ...optionalHeaders }
  });

export { getData, postData, patchData, putData, deleteData };
