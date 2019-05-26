import 'onsenui/css/onsenui.css'; // Onsen UI basic CSS
// import 'onsenui/css/onsen-css-components.css'; // Default Onsen UI CSS components
import './onsen-css-components.css'; // Onsen UI CSS components source for custom themes (requires cssnext)
import './vue-onsenui-kitchensink.css'; // CSS specific to this app

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueOnsen from 'vue-onsenui'; // For UMD
// import VueOnsen from 'vue-onsenui/esm'; // For ESM
// import * as OnsenComponents from './onsen-components'; // For ESM
import storeLike from './store.js';
import CustomToolbar from './partials/CustomToolbar.vue';
import AppNavigate from './AppNavigator.vue';
import firebase from 'firebase';
// import VueLocalStorage from 'vue-localstorage'
// import App from './App.vue';
import 'expose-loader?$!expose-loader?jQuery!jquery'
import IMP from 'vue-iamport'

Vue.use(Vuex);
Vue.use(VueOnsen);
// Vue.use(VueLocalStorage);
// Register components globally
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM

//Vue.use(IMP, '가맹점식별코드')
Vue.use(IMP, 'imp11299540') //아임포트 회원가입 후 발급된 가맹점 고유 코드를 사용해주세요. 예시는 KCP공식 아임포트 데모 계정입니다.
Vue.IMP().load()

Vue.component('custom-toolbar', CustomToolbar); // Common toolbar
Vue.prototype.$http = axios;


Vue.config.productionTip = false;



var config = {
  apiKey: "AIzaSyDPJxh92Ju7jjBapbm1fNSE0pYAktZ8ERw",
  authDomain: "matching-system-of-guide.firebaseapp.com",
  databaseURL: "https://matching-system-of-guide.firebaseio.com",
  projectId: "matching-system-of-guide",
  storageBucket: "matching-system-of-guide.appspot.com",
  messagingSenderId: "213479373039"
};
firebase.initializeApp(config);

new Vue({
  el: '#app',
  render: h => h(AppNavigate),
  store: new Vuex.Store(storeLike),
  beforeCreate() {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid();

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }
  }
});
