import axios from "axios";
import { $serviceString as string } from "@/services/service-string";
import { LOGIN_URL } from "@/env";

export default {
  AUTH_SUCCESS: (state, { response, auth = false }) => {
    if (auth) {
      localStorage.setItem(
        "gradelyAuthToken",
        response.access_token ? response.access_token : response.token
      );
      localStorage.setItem(
        "gradelyCapEntryToken",
        response.refresh_token ? response.access_token : response.token
      );

      axios.defaults.headers.common["Authorization"] = response.access_token
        ? response.access_token
        : response.token;
      localStorage.setItem("timestamp", +new Date());
    }

    let userData = {};
    let accountTypes = ["school", "teacher", "parent", "student"];
    let randomToken = string.generateRandomString(25);
    let accountIndex = accountTypes.findIndex(
      (account) => account === response.type
    );

    // SCHOOL ACCOUNT
    if (response.type === "school") {
      userData.school_id = response.school_id || null;
      userData.school_name = response.school_name || null;
      userData.school_slug = response.school_slug || null;
      userData.school_owner = response.school_owner || null;
      userData.country = response.country || null;
      userData.state = response.state || null;
    }

    // STUDENT ACCOUNT
    if (response.type === "student") {
      userData.class_code = response.class.class_code
        ? response.class.class_code
        : response.class.description;

      userData.class_name = response.class.class_name;
    }

    // STUDENT AND PARENT ACCOUNT
    if (["parent", "student"].includes(response.type)) {
      userData.mode = response.mode || "practice";
    }

    userData.id = response.id;
    userData.code = response.code;
    userData.class = response?.class ?? null;
    userData.full_name = `${response.firstname} ${response.lastname}`;
    userData.email = response.email;
    userData.phone = response.phone;
    userData.image = response.image;
    userData.is_boarded = response.is_boarded;
    userData.is_verified = response.verification_status;
    userData.is_tutor = response.is_tutor;
    userData.relationship = response.relationship_status;
    userData.entry_timestamp = Math.round(new Date().getTime() / 1000);
    userData.cap_token = `${randomToken}${accountIndex}`;
    userData.has_class = response?.have_class;
    userData.term = string.getCapitalizeText(
      response?.term_week?.term || response?.termWeek?.term || "first"
    );
    userData.week = response?.term_week?.week ?? response?.termWeek?.week ?? 10;
    userData.session =
      response?.term_week?.session ??
      response?.termWeek?.session ??
      "2020-2021";

    state.authUser = userData;
    localStorage.setItem("authUser", JSON.stringify(state.authUser));
  },

  UPDATE_TOKEN_SET: (_, response) => {
    localStorage.setItem("gradelyAuthToken", response.access_token);
    localStorage.setItem("gradelyCapEntryToken", response.refresh_token);

    axios.defaults.headers.common["Authorization"] = response.access_token;
  },

  UPDATE_USER_IMAGE: (state, image) => {
    let userData = JSON.parse(localStorage.getItem("authUser"));
    userData.image = image;
    state.authUser = userData;
    localStorage.setItem("authUser", JSON.stringify(state.authUser));
  },

  UPDATE_CATCHUP_MODE: (state, mode) => {
    let userData = JSON.parse(localStorage.getItem("authUser"));
    userData.mode = mode;
    state.authUser = userData;
    localStorage.setItem("authUser", JSON.stringify(state.authUser));
  },

  CONFIRM_VERIFICATION_STATUS: (state) => {
    let userData = JSON.parse(localStorage.getItem("authUser"));
    userData.is_verified = 1;
    state.authUser = userData;
    localStorage.setItem("authUser", JSON.stringify(state.authUser));
  },

  CONFIRM_BOARDED_STATUS: (state) => {
    let userData = JSON.parse(localStorage.getItem("authUser"));
    userData.is_boarded = 1;
    state.authUser = userData;
    localStorage.setItem("authUser", JSON.stringify(state.authUser));
  },

  UPDATE_AUTH_USER_CONTACT: (state, { email, phone }) => {
    let userData = JSON.parse(localStorage.getItem("authUser"));
    userData.email = email;
    userData.phone = phone;
    state.authUser = userData;
    localStorage.setItem("authUser", JSON.stringify(state.authUser));
  },

  AUTH_LOGOUT: () => {
    localStorage.clear();
    sessionStorage.clear();

    location.href =
      process.env.NODE_ENV === "development" ? LOGIN_URL.dev : LOGIN_URL.prod;
  },
};
