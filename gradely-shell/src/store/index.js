import Vue from "vue";
import Vuex, { Store } from "vuex";

import auth from "./auth";
import general from "./general";
import aws from "./aws";
import invites from "./invites";
import dbProfile from "@/modules/profile/store/dbProfile";
import onboarding from "@/modules/onboarding/store";

import {
  dbTeacher,
  dbStudent,
  dbHome,
  dbWeekly,
  dbApp,
} from "@/modules/dashboard/store/";

import {
  dbFeeds,
  dbMembers,
  dbAssessments,
  dbReports,
  dbCalendar,
} from "@/modules/base/store";

Vue.use(Vuex);

const store = new Store({
  modules: {
    auth,
  },
});

store.registerModule("general", general);
store.registerModule("aws", aws);
store.registerModule("invites", invites);
store.registerModule("onboarding", onboarding);
store.registerModule("dbProfile", dbProfile);
store.registerModule("dbHome", dbHome);
store.registerModule("dbTeacher", dbTeacher);
store.registerModule("dbStudent", dbStudent);
store.registerModule("dbApp", dbApp);
store.registerModule("dbWeekly", dbWeekly);
store.registerModule("dbFeeds", dbFeeds);
store.registerModule("dbMembers", dbMembers);
store.registerModule("dbAssessments", dbAssessments);
store.registerModule("dbReports", dbReports);
store.registerModule("dbCalendar", dbCalendar);

export default store;
