import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import CKEditor from "@ckeditor/ckeditor5-vue2";

// IMPORT APPLICATION STYLES
import "bootstrap/dist/css/bootstrap.css";
import "gradely_asset_store/dist/css/app.css";
import "@/assets/scss/custom.scss";

// IMPORT PLUGINS
import "@/plugins";

Vue.use(CKEditor);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
