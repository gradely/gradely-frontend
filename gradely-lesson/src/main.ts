import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// IMPORT APPLICATION STYLES
import 'bootstrap/dist/css/bootstrap.min.css';
import 'gradely_asset_store/dist/css/app.css';
import 'nprogress/nprogress.css';
import '@/assets/scss/custom.scss';
import 'vue2-datepicker/index.css';
import 'animate.css/animate.min.css';

// IMPORT PLUGINS
import '@/plugins';

// VUE CONFIG
const isDev = process.env.NODE_ENV === 'development';

Vue.config.productionTip = isDev;
Vue.config.devtools = isDev;
Vue.config.performance = isDev;

// VUE INSTANCE
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
