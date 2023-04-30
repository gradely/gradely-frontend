import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

// import Bugsnag from "@bugsnag/js";
// import BugsnagPluginVue from "@bugsnag/plugin-vue";

// Bugsnag.start({
//   apiKey: "9c83086c9dcecff2ed2af8017fe939f2",
//   plugins: [new BugsnagPluginVue()],
// });

// const bugsnagVue = Bugsnag.getPlugin("vue");
// bugsnagVue.installVueErrorHandler(Vue);

// Bugsnag.notify(new Error("Test error"));

// IMPORT APPLICATION STYLES
import "bootstrap/dist/css/bootstrap.css";
import "../public/css/app.css";
import "nprogress/nprogress.css";
import "vue2-datepicker/index.css";

// IMPORT PLUGINS
import "@/plugins";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
