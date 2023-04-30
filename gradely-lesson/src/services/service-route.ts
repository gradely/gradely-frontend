import store from '@/store';
import { EXTERNAL_URL } from '@/env';

// APPEND HASH TOKEN TO URL
const urlHash = (url: string) => {
  if (url.includes('?')) return `${url}&timestamp=${new Date().getTime()}`;
  else return `${url}?timestamp=${new Date().getTime()}`;
};

// GET AUTH TYPE
const getAuthType = () => {
  let localstore: any = store;
  let types = ['school', 'teacher', 'parent', 'student'];
  return localstore.state.auth.token
    ? types[Number(store.getters['auth/getAuthAccount'])]
    : false;
};

// PROTECT ROUTE ENTRY BY ACCOUNT TYPE
const isRouteAccessValid = (access_list: Array<any> = []) => {
  if (access_list.length)
    return access_list.includes(getAuthType()) || access_list.includes('all')
      ? true
      : false;
  else return true;
};

// REDIRECT TO ESTERNAL MICRO FRONTEND ROUTES
const externalPageRedirect = (app: any, path: any) => {
  let environment = process.env.NODE_ENV;

  let url = EXTERNAL_URL(app, path);
  location.href = environment === 'development' ? url.dev : url.prod;
};

export { urlHash, externalPageRedirect, isRouteAccessValid };
