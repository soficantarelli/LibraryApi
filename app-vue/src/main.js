import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios'
import NavBar from './components/NavBar.vue'
import NavBarLibrarian from './components/NavBarLibrarian.vue'
import NavBarUser from './components/NavBarUser.vue'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

Vue.component('NavBar', NavBar);
Vue.component('NavBarLibrarian', NavBarLibrarian);
Vue.component('NavBarUser', NavBarUser);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')