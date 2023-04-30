import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import baseRoutes from "@/router/baseRoutes";
import falseRoutes from "@/router/falseRoutes";
import errorRoutes from "@/router/errorRoutes";
import { getLocalStorage } from "../services/localStorageMgt";
import { postData } from "../services/api/Axios.method";
import { SET_IS_LOGGED_IN } from "../store/module/general/constant";

Vue.use(VueRouter);
const routes = [...baseRoutes, ...falseRoutes, ...errorRoutes];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  duplicateNavigationPolicy: "reload",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else
      return {
        x: 0,
        y: 0,
      };
  },
});

router.beforeEach((to, _, next) => {
  const token = getLocalStorage("gradelyAuthToken");
  // VERIFY IF ROUTE NEEDS AUTHENTICATION
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.General.isLoggedIn) {
      next();
      return;
    }
    if (!token) {
      if (process.env.NODE_ENV === "development") {
        next({
          name: "DevLogin",
        });
        return;
      } else {
        // since its a microfrontend on live version we have to redirect to the live verson login page
        window.location = `${window.location.origin}/login`;
        // next({
        //   name: "DevLogin"
        // });
        return;
      }
    } else {
      postData("/validate", { token })
        .then((response) => {
          if (!response?.data) {
            localStorage.clear();
            if (process.env.NODE_ENV === "development") {
              next({
                name: "DevLogin",
              });
              return;
            } else {
              // since its a microfrontend on live version we have to redirect to the live verson login page
              window.location = `${window.location.origin}/login`;
              // next({
              //   name: "DevLogin"
              // });
              return;
            }
          } else {
            store.commit(SET_IS_LOGGED_IN, true);
            next();
            return;
          }
        })
        .catch(() => {
          localStorage.clear();
          if (process.env.NODE_ENV === "development") {
            next({
              name: "DevLogin",
            });
            return;
          } else {
            // since its a microfrontend on live version we have to redirect to the live verson login page
            window.location = `${window.location.origin}/login`;
            // next({
            //   name: "DevLogin"
            // });
            return;
          }
        });
    }
  }
  // VERIFY IF ROUTE IS A JUST A GUEST
  else if (to.matched.some((record) => record.meta.guest)) {
    if (!token) next();
    else {
      if (process.env.NODE_ENV === "development") {
        next({
          name: "CreateHomeWork",
        });
      } else {
        window.location = `${window.location.origin}/`;
      }
    }
  } else next();
});
export default router;
