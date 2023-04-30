export default {
  UPDATE_INSTALLED_APPS_LIST: (state, apps) => (state.installed_apps = apps),

  UPDATE_APP_INFO: (state, { id, app }) => {
    state.app_info.id = id;
    state.app_info.data = app;
  },

  UPDATE_TEACHER_APPS: (state, { id, apps }) => {
    state.teacher_apps.id = id;
    state.teacher_apps.apps = apps;
  },
};
