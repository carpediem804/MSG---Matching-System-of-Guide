import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSession from 'vue-session'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(VueSession);
Vue.use(BootstrapVue);


new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
