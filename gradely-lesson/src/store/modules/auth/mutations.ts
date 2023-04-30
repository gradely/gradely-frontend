import axios from 'axios';
import { MutationTree } from 'vuex';
import { $serviceString as string } from '@/services/service-string';
import { LOGIN_URL } from '@/env';

import { AuthModel, UserDataModel } from '@/store/models';

// ENUM
export enum mutations {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  UPDATE_TOKEN_SET = 'UPDATE_TOKEN_SET',
  UPDATE_USER_IMAGE = 'UPDATE_USER_IMAGE',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}

const authMutations: MutationTree<AuthModel> = {
  [mutations.AUTH_SUCCESS]: (
    state,
    { response, auth = false }: { response: any; auth: boolean }
  ) => {
    if (auth) {
      localStorage.setItem(
        'gradelyAuthToken',
        response.access_token ? response.access_token : response.token
      );
      localStorage.setItem(
        'gradelyCapEntryToken',
        response.refresh_token ? response.access_token : response.token
      );

      axios.defaults.headers.common['Authorization'] = response.access_token
        ? response.access_token
        : response.token;
      localStorage.setItem('timestamp', new Date().toISOString());
    }

    let userData: UserDataModel = {} as UserDataModel;
    let accountTypes = ['school', 'teacher', 'parent', 'student'];
    let randomToken = string.generateRandomString(25);
    let accountIndex = accountTypes.findIndex(
      (account) => account === response.type
    );

    // SCHOOL ACCOUNT
    if (response.type === 'school') {
      userData.school_id = response.school_id || null;
      userData.school_name = response.school_name || null;
      userData.school_slug = response.school_slug || null;
      userData.school_owner = response.school_owner || null;
      userData.country = response.country || null;
      userData.state = response.state || null;
    }

    // STUDENT ACCOUNT
    if (response.type === 'student') {
      userData.class_code = response.class.class_code
        ? response.class.class_code
        : response.class.description;

      userData.class_name = response.class.class_name;
    }

    // STUDENT AND PARENT ACCOUNT
    if (['parent', 'student'].includes(response.type)) {
      userData.mode = response.mode || 'practice';
    }

    userData.id = response.id;
    userData.code = response.code;
    userData.full_name = `${response.firstname} ${response.lastname}`;
    userData.email = response.email;
    userData.image = response.image;
    userData.is_boarded = response.is_boarded;
    userData.is_tutor = response.is_tutor;
    userData.relationship = response.relationship_status;
    userData.entry_timestamp = Math.round(new Date().getTime() / 1000);
    userData.cap_token = `${randomToken}${accountIndex}`;
    userData.term = string.getCapitalizeText(
      response?.termWeek?.term || 'first'
    );
    userData.week = response?.termWeek?.week || 10;
    userData.session = response?.termWeek?.session || '2020/2021';

    state.authUser = userData;
    localStorage.setItem('authUser', JSON.stringify(state.authUser));
  },

  [mutations.UPDATE_TOKEN_SET]: (_: any, response: any) => {
    localStorage.setItem('gradelyAuthToken', response.access_token);
    localStorage.setItem('gradelyCapEntryToken', response.refresh_token);

    axios.defaults.headers.common['Authorization'] = response.access_token;
  },

  [mutations.UPDATE_USER_IMAGE]: (state, image: string) => {
    let userData = JSON.parse(localStorage.getItem('authUser') as any);
    userData.image = image;
    state.authUser = userData;
    localStorage.setItem('authUser', JSON.stringify(state.authUser));
  },

  [mutations.AUTH_LOGOUT]: () => {
    localStorage.clear();

    location.href =
      process.env.NODE_ENV === 'development' ? LOGIN_URL.dev : LOGIN_URL.prod;
  },
};

export { authMutations as default };
