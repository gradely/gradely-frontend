export const API_VERSION = "v2";
// export const API_BASE_URL = "https://testapi.gradely.ng";
export const API_BASE_URL = "https://api.gradely.ng";

export const APP_BASE_URL = "https://testapp.gradely.ng";
const BASE_DEV_URL = "http://localhost:";

export const LOGIN_URL = {
  dev: BASE_DEV_URL + "8095/auth/login",
  prod: APP_BASE_URL + "/auth/login",
};

export const EXTERNAL_URL = (external) => {
  return {
    dev: BASE_DEV_URL + "8093/" + "" + external,
    prod: APP_BASE_URL + "/" + "" + external,
  };
};
