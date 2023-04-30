import Vue from 'vue';

// IMPORT THIRD PARTY PLUGINS
import VueLazyload from 'vue-lazyload';
import Meta from 'vue-meta';
import PortalVue from 'portal-vue';
import { mixin as clickaway } from 'vue-clickaway';
import Vuelidate from 'vuelidate';

Vue.use(Meta);
Vue.use(PortalVue);
Vue.use(Vuelidate);
Vue.use(VueLazyload);
Vue.mixin(clickaway);
