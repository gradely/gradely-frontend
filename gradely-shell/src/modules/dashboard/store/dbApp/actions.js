import { $serviceApi as api } from "@/services/service-api";

const routes = {
  recommended_apps: "/recommendation",
  school_app_url: "/school",
  app_info: "/info/",
  report_app: "/report-app",
};

export default {
  // GET TEACHERS IN SCHOOL
  async getSchoolApps({ commit, getters }) {
    let installed_apps = getters.getInstalledApps;

    if (installed_apps.length) return api.deliverFromStore(installed_apps);
    else {
      let response = await api.service("app").fetch(routes.school_app_url);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? commit("UPDATE_INSTALLED_APPS_LIST", response.data)
        : null;

      return response;
    }
  },

  // CHECK APP STATUS INSTALLED OR NOT
  async checkAppStatus(_, app_id) {
    return await api.service("app").fetch(`${routes.school_app_url}/${app_id}`);
  },

  // GET ALL RECOMMENDED APPS
  async getRecommendedApps() {
    return await api.service("app").fetch(routes.recommended_apps);
  },

  // GET APP INFO
  async getAppInfo({ commit, getters }, app_id) {
    let app_info = getters.getAppInfo;

    if (app_id === app_info.id) return api.deliverFromStore(app_info.data);
    else {
      let response = await api
        .service("app")
        .fetch(`${routes.app_info}${app_id}`);

      response.code === 200
        ? commit("UPDATE_APP_INFO", { id: app_id, app: response.data })
        : null;

      return response;
    }
  },

  // GET TEACHER CLASS RELATED APPS
  async getTeacherClassApp({ commit, getters }, class_id) {
    let app = getters.getTeacherApp;

    if (class_id === app.id) return api.deliverFromStore(app.apps);
    else {
      let response = await api.service("app").fetch(`?class_id=${class_id}`);

      response.code === 200
        ? commit("UPDATE_TEACHER_APPS", { id: class_id, apps: response.data })
        : null;

      return response;
    }
  },

  /************* POST REQUEST ************/
  async installAppToSchool(_, payload) {
    return await api.service("app").push(routes.school_app_url, payload);
  },

  async reportAppInStore(_, payload) {
    return await api.service("app").push(routes.report_app, payload);
  },
};
