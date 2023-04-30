import store from "@/store";
import { EXTERNAL_URL } from "@/env";

// APPEND HASH TOKEN TO URL
const urlHash = (url) => {
  if (url.includes("?")) return `${url}&timestamp=${new Date().getTime()}`;
  else return `${url}?timestamp=${new Date().getTime()}`;
};

// GET AUTH TYPE
const getAuthType = () => {
  let types = ["school", "teacher", "parent", "student"];
  return store.state.auth.token
    ? types[Number(store.getters["auth/getAuthAccount"])]
    : false;
};

// REDIRECT TO ESTERNAL MICRO FRONTEND ROUTES
const externalPageRedirect = (path) => {
  let environment = process.env.NODE_ENV;
  let account = getAuthType();

  let url = EXTERNAL_URL(account, path, environment);
  location.href = environment === "development" ? url.dev : url.prod;
};

export { urlHash, externalPageRedirect };
