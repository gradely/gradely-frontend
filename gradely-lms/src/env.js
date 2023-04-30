export const API_VERSION = "v2";
export const API_BASE_URL = "https://testapi.gradely.ng";

export const API_VERSION_NEW = "v2.1";
export const API_BASE_URL_NEW = "https://testapi.gradely.co";

export const APP_BASE_URL = "https://testapp.gradely.ng";

const BASE_DEV_URL = "http://localhost:";

const environment = process.env.NODE_ENV;

export const environmentBase = () =>
  environment === "development" ? BASE_DEV_URL : APP_BASE_URL;

export const LOGIN_URL = {
  dev: BASE_DEV_URL + "8085/login",
  prod: `${APP_BASE_URL}/login`,
};

export const EXTERNAL_URL = (external) => {
  return {
    dev: `${BASE_DEV_URL}8093/${external}`,
    // prod: `${APP_BASE_URL}/${external}`,
    prod: `${window.location.origin}/${external}`,
  };
};
