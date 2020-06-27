import Vue from 'vue'
import App from './components/App.vue';
import store from "./store/store.js";
import Notifications from "vue-notification";

Vue.config.productionTip = false;

Vue.use(Notifications);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
