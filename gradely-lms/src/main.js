import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// IMPORT APPLICATION STYLING LINKS
import "bootstrap/dist/css/bootstrap.css";
import "gradely_asset_store/dist/css/app.css";

import { renderAssets } from "@/services/assetMgt";
import VueProgressiveImage from "vue-progressive-image";
import VueLazyload from "vue-lazyload";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import Meta from "vue-meta";
import PortalVue from "portal-vue";
import VueObserveVisibility from "vue-observe-visibility";

// Vue.component("vue-headful", vueHeadful);
Vue.use(Meta);
Vue.use(CKEditor);
Vue.use(VueLazyload);
Vue.use(VueProgressiveImage);
Vue.mixin(renderAssets);
Vue.use(PortalVue);
Vue.use(VueObserveVisibility);
let EventBus = new Vue();
Vue.prototype.$bus = EventBus;

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");