import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import assessment from "./assesment/index";
import general from "./general/index";
import Login from "../pages/false/store.module/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    assessment,
    general,
    Login
  }
});
