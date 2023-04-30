export const API_VERSION = "v2";
export const API_BASE_URL = "";

export const APP_BASE_URL = "";

export const REFERRAL_BASE_URL = "";
export const TOPIC_BASE_URL = "";

const BASE_DEV_URL = "";

export const LOGIN_URL = {
  dev: BASE_DEV_URL + "8085/login",
  prod: APP_BASE_URL + "/login",
};

export const REPORT_CARD_URL = (path) => {
  return {
    dev: BASE_DEV_URL + "8094/report-card/" + path,
    prod: APP_BASE_URL + "/report-card/" + path,
  };
};

export const EXTERNAL_URL = (account, external) => {
  return {
    dev: BASE_DEV_URL + "8085/" + account + "" + external,
    prod: APP_BASE_URL + "/" + account + "" + external,
  };
};
