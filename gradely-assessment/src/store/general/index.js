import { debounce } from "lodash-es";

import { postData } from "../../scripts/api/axios.method";
const state = {
  network_error: {},
  isLoggedIn: false,
  toast: {
    toastOpen: false,
    toastState: "success",
    toastText: "Hello Toast",
    showBtn: true
  }
};

const getters = {
  getNetworkError: (state) => state.network_error,
  getIsLoggedIn: (state) => state.isLoggedIn,
  getToastState: (state) => state.toast
};

const mutations = {
  setNetworkError(state, payload) {
    state.network_error = payload;
  },
  setIsLoggedIn(state, payload) {
    state.isLoggedIn = payload;
  },
  setToast(state, payload) {
    state.toast = payload;
  },
  clearToast(state) {
    state.toast = {
      toastOpen: false,
      toastState: state?.toast?.toastState,
      toastText: state?.toast?.toastState
    };
  }
};

const actions = {
  toastAction(
    { commit },
    payload = {
      toastData: {
        toastOpen: false,
        toastState: "success",
        toastText: "Hello Toast"
      },
      isStatic: false,
      timeout: 5000,
      callback: () => {}
    }
  ) {
    const debouncedFunction = debounce(
      function() {
        commit("setToast", payload?.toastData);
        if (payload?.isStatic) {
          if (payload?.callback) {
            payload?.callback();
          }

          return;
        }
        setTimeout(() => {
          if (!state.toast.toastOpen) {
            return;
          } else {
            if (payload?.callback) {
              payload.callback();
            }
            commit("setToast", {
              ...payload?.toastData,
              isStatic: false,
              toastOpen: false
            });
          }
        }, payload.timeout);
      },
      payload.timeout,
      {
        leading: true
      }
    );
    debouncedFunction();
  },
  clickLogger(_, payload) {
    postData("user-action-logger", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
