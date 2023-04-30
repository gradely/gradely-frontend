import store from "@/store";
import { postData } from "../scripts/api/axios.method";

// export default (to, from, next) => {
//   /**
//    * INPUT MIDDLEWARE WORKFLOW HERE....
//    */
//   next();
// };

export default (to, _, next) => {
  const token = localStorage.getItem("gradelyAuthToken");
  // VERIFY IF ROUTE NEEDS AUTHENTICATION
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.general.isLoggedIn) {
      next();
      return;
    }
    if (!token) {
      if (process.env.NODE_ENV === "development") {
        next({
          name: "DevLogin",
          query: {
            redirect: window.location.href,
          },
        });
        return;
      } else {
        // since its a microfrontend on live version we have to redirect to the live verson login page
        // window.location = "https://gradely.ng/login";
        next({
          name: "DevLogin",
          query: {
            redirect: window.location.href,
          },
        });
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
                query: {
                  redirect: window.location.href,
                },
              });
              return;
            } else {
              // since its a microfrontend on live version we have to redirect to the live verson login page
              // window.location = "https://app.gradely.ng/login";
              next({
                name: "DevLogin",
              });
              return;
            }
          } else {
            store.commit("setIsLoggedIn", true);
            next();
            return;
          }
        })
        .catch(() => {
          localStorage.clear();
          if (process.env.NODE_ENV === "development") {
            next({
              name: "DevLogin",
              query: {
                redirect: window.location.href,
              },
            });
            return;
          } else {
            // since its a microfrontend on live version we have to redirect to the live verson login page
            // window.location = "https://gradely.ng/login";
            // window.location = "https://app.gradely.ng/login";
            next({
              name: "DevLogin",
            });
            return;
          }
        });
    }
  }
  // VERIFY IF ROUTE IS A JUST A GUEST
  else if (to.matched.some((record) => record.meta.guest)) {
    // if (!token) next();
    // else {
    //   next({
    //     name: "/"
    //   });
    // }
    // } else next();
    next();
  } else next();
};
