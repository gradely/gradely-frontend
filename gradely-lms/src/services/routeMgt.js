import store from "@/store";
import { EXTERNAL_URL } from "@/env";

// APPEND HASH TOKEN TO URL
const urlHash = (url) => {
  if (url.includes("?")) return `${url}&timestamp=${new Date().getTime()}`;
  else return `${url}?timestamp=${new Date().getTime()}`;
};

// REDIRECT TO ESTERNAL MICRO FRONTEND ROUTES
const externalPageRedirect = (path) => {
  let environment = process.env.NODE_ENV;
  let account =
    store.getters.getAuthAccount === "0" || store.getters.getAuthAccount === "2"
      ? "parent"
      : "student";

  let url = EXTERNAL_URL(account, path, environment);

  if (environment === "development") location.href = url.dev;
  else location.href = url.prod;
};

export { urlHash, externalPageRedirect };
