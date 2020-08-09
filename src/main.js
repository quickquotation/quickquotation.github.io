// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './vuex/store.js'
import router from './router'
import './assets/css/main.css'
import 'bootstrap/dist/js/bootstrap.bundle';

Vue.config.productionTip = false
window._ = require('lodash');
window.$ = require('jquery');
window.jsPDF = require('jspdf');
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
