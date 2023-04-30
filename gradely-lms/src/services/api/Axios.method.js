import { getLocalStorage } from "@/services/localStorageMgt";
import { urlHash } from "@/services/routeMgt";
import Instance from "./IAxios.config";

const defaultHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${getLocalStorage("gradelyAuthToken")}`,
};

// get verb for api call
const getData = async (urlParam, optionalHeaders) =>
  await Instance.get(urlHash(urlParam), {
    headers: optionalHeaders ? optionalHeaders : defaultHeader,
  });

//   post verb for api-call
const postData = async (urlParam, data = {}, optionalHeaders) =>
  await Instance.post(urlParam, data, {
    headers: optionalHeaders ? optionalHeaders : defaultHeader,
  });

//   delete verb for api-call
const deleteData = async (urlParam, optionalHeaders) =>
  await Instance.delete(urlParam, {
    headers: optionalHeaders ? optionalHeaders : defaultHeader,
  });

//   patch verb

const patchData = async (urlParam, data = {}, optionalHeaders) =>
  await Instance.patch(urlParam, data, {
    headers: optionalHeaders ? optionalHeaders : defaultHeader,
  });

//   patch verb

const putData = async (urlParam, data = {}, optionalHeaders) =>
  await Instance.put(urlParam, data, {
    headers: optionalHeaders ? optionalHeaders : defaultHeader,
  });

export { getData, postData, patchData, putData, deleteData };
