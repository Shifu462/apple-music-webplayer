import Vue from 'vue';
import App from './App.vue';
import 'font-awesome/css/font-awesome.css';

// TODO: use toLocaleDateString() instead of moment
import VueMoment from 'vue-moment';

import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import store from './store';

// Raven
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

// Private config
import privateConfig from './private';

Vue.use(VueMoment);
Vue.use(BootstrapVue);
Vue.use(VueRouter);

// Configure Sentry
if (privateConfig.sentry) {
  Raven
    .config(privateConfig.sentry)
    .addPlugin(RavenVue, Vue)
    .install();
}

// Handle init
if (MusicKit) {
  store.dispatch('musicKit/init');
} else {
  document.addEventListener('musickitloaded', () => {
    store.dispatch('musicKit/init');
  });
}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
