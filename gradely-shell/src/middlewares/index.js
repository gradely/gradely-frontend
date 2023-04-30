import store from "@/store";
import { isRouteAccessValid } from "@/services/service-route";

// CHECK USER PROFILE RESPONSE
const getUserProfile = async (next, access) => {
  let auth = await store.dispatch("auth/getActiveUserProfile");
  if (auth.code === 200) {
    if (isRouteAccessValid(access)) next();
    else next({ name: "FalseBase" });
  } else
    next({
      name: "FalseLogin",
      query: {
        redirect: window.location.href,
      },
    });
};

export default (to, from, next) => {
  // THIS CONDITION STATEMENT OCCURS BOTH IN DEVELOPMENT AND PRODUCTION
  if (localStorage.getItem("gradelyAuthToken")) {
    store.dispatch("auth/checkTokenValidity");

    if (localStorage.getItem("authUser") === null)
      store.dispatch("auth/getActiveUserProfile");
  }

  // VERIFY IF ROUTE NEEDS AUTHENTICATION
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("gradelyAuthToken") === null) {
      next({
        name: "FalseLogin",
        query: {
          redirect: window.location.href,
        },
      });
    } else if (localStorage.getItem("authUser")) {
      if (isRouteAccessValid(to.meta.access)) next();
      else next({ name: "FalseBase" });
    } else getUserProfile(next, to.meta.access);
  }
  // VERIFY IF ROUTE IS A JUST A GUEST
  else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("gradelyAuthToken") === null) next();
    else {
      if (isRouteAccessValid(to.meta.access)) next();
      else next({ name: "FalseBase" });
    }
  } else next();
};
