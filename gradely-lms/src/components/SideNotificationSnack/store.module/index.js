import {
  GET_TOAST_STATE,
  SET_TOAST,
  TOAST_ACTION,
  CLEAR_TOAST
} from "./constants";
import { debounce } from "lodash";

const state = {
  toast: {
    toastOpen: false,
    toastState: "success",
    toastText: "Hello Toaast",
    showBtn: true
  }
};
const getters = {
  [GET_TOAST_STATE]: (state) => state.toast
};

const mutations = {
  [SET_TOAST](state, payload) {
    state.toast = payload;
  },
  [CLEAR_TOAST](state) {
    state.toast = {
      toastOpen: false,
      toastState: state?.toast?.toastState,
      toastText: state?.toast?.toastState
    };
  }
};

const actions = {
  [TOAST_ACTION](
    { commit },
    payload = {
      toastData: {
        toastOpen: false,
        toastState: "success",
        toastText: "Hello Toaast"
      },
      isStatic: false,
      timeout: 5000,
      callback: () => {}
    }
  ) {
    const debouncedFunction = debounce(
      function() {
        commit(SET_TOAST, payload?.toastData);
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
            commit(SET_TOAST, {
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
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
