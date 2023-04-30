import Vue from "vue";
import Vuex from "vuex";
import QuestionSelect from "../pages/QuestionSelect/store.module.QuestionSelect.Module/QuestionSelect";
import CreteHomeWork from "../pages/TemporaryPages/store.module.CreateHomework/CreateHomeWork";
import QuestionCreate from "../pages/QuestionCreate/store.module.QuestionCreateModule/QuestionCreate";
import General from "./module/general/general";
import AssesmentQuestions from "../pages/AssesmentQuestions/store.module.AssesmentQuestions";
import ToastFile from "../components/SideNotificationSnack/store.module/index";
import Login from "../pages/false/store.module/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    QuestionSelect,
    QuestionCreate,
    CreteHomeWork,
    General,
    AssesmentQuestions,
    ToastFile,
    Login
  }
});
