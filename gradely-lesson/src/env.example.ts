export const API_VERSION = 'your version';
export const API_BASE_URL = 'https://api.example.com';

export const NEW_API_VERSION = 'new version';
export const NEW_API_BASE_URL = 'https://api.example.com';

export const APP_BASE_URL = 'https://app.example.com';
export const OLD_APP_BASE_URL = 'https://old.app.example.com';

const BASE_DEV_URL = 'http://localhost:';

const environment = process.env.NODE_ENV;

export const LOGIN_URL = {
  dev: BASE_DEV_URL + 'YOUR_PORT/auth/login',
  prod: APP_BASE_URL + '/auth/login',
};

const environmentBase = () =>
  environment === 'development' ? BASE_DEV_URL : APP_BASE_URL;

const oldEnvironmentBase = () =>
  environment === 'development' ? BASE_DEV_URL : OLD_APP_BASE_URL;

export const EXTERNAL_URL = (app = '', path = '') => {
  let getPort = environment === 'development' ? 'YOUR_PORT' : '';
  // return environmentBase() + getPort + "/" + app + path;
  return {
    dev: environmentBase() + getPort + '/' + app + path,
    prod: environmentBase() + getPort + '/' + app + path,
  };
};

export const REDIRECT_TO_APP = (account: any, path: string) => {
  let getPort = environment === 'development' ? '8085' : '';
  return oldEnvironmentBase() + getPort + '/app/' + account + '/' + path;
};
