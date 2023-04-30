import Vue from "vue";
import Vuex, { createLogger, StoreOptions } from "vuex";
import aws from "./modules/aws";

// MODULES
import { auth, lesson, subject } from '@/store/modules';

Vue.use(Vuex);

const vuexLogger =
  process.env.NODE_ENV === 'development' ? createLogger() : () => {};

const store: StoreOptions<any> = {
  plugins: [vuexLogger],
  modules: {
    auth,
    lesson,
    subject,
    aws
  }
};

export default new Vuex.Store(store);
