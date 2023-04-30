import axios from "axios";
import { $serviceString as string } from "@/services/service-string";
import { LOGIN_URL } from "@/env";

export default {
  AUTH_SUCCESS: (state, { response, auth = false }) => {
    if (auth) {
      localStorage.setItem("gradelyAuthToken", response.token);
      axios.defaults.headers.common["Authorization"] = response.token;
      localStorage.setItem("timestamp", +new Date());
    }

    let userData = {};
    let accountTypes = ["school", "teacher", "parent", "student"];
    let randomToken = string.generateRandomString(25);
    let accountIndex = accountTypes.findIndex(
      (account) => account === response.type
    );

    if (response.type === "student")
      userData.class_code = response.class.class_code
        ? response.class.class_code
        : response.class.description;

    userData.id = response.id;
    userData.code = response.code;
    userData.full_name = response.full_name;
    userData.email = response.email;
    userData.image = response.image;
    userData.is_boarded = response.is_boarded;
    userData.mode = response.mode || "practice";
    userData.term = string.getCapitalizeText(response.termWeek.term);
    userData.week = response.termWeek.week;
    userData.relationship = response.relationshipStatus;
    userData.entry_timestamp = Math.round(new Date().getTime() / 1000);
    userData.cap_token = `${randomToken}${accountIndex}`;

    state.authUser = userData;
    localStorage.setItem("authUser", JSON.stringify(state.authUser));
  },

  AUTH_LOGOUT: (state) => {
    localStorage.removeItem("gradelyAuthToken");
    localStorage.removeItem("getAuthUser");
    localStorage.clear();

    state.token = "";
    state.authUser = "";

    location.href =
      process.env.NODE_ENV === "development" ? LOGIN_URL.dev : LOGIN_URL.prod;
  },
};
