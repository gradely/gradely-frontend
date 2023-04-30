import Vue from "vue";

// IMPORT THIRD PARTY PLUGINS
import VueLazyload from "vue-lazyload";
import Meta from "vue-meta";
import PortalVue from "portal-vue";
import VueObserveVisibility from "vue-observe-visibility";
import { mixin as clickaway } from "vue-clickaway";
import VAnimateCss from "v-animate-css";
import VueTypedJs from "vue-typed-js";

Vue.use(Meta);
Vue.use(VueLazyload);
Vue.use(PortalVue);
Vue.use(VueObserveVisibility);
Vue.mixin(clickaway);
Vue.use(VAnimateCss);
Vue.use(VueTypedJs);
