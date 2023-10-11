import 'es6-promise/auto'
import axios from 'axios'
require('@/bootstrap');
import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Index from './Index'
import auth from './auth'
import router from './router'
require('@/directives');

// Set Vue globally
window.Vue = Vue
 
// Set Vue router
Vue.router = router 
Vue.use(VueRouter)

// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = '/api/admin'
axios.defaults.timeout = 120000;
// axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
//axios.defaults.headers.common['X-CSRFToken'] = document.head.querySelector('meta[name="csrf-token"]').content;
// axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

Vue.use(VueAuth, auth)
// Load Index
Vue.component('index', Index)

import { VueReCaptcha } from 'vue-recaptcha-v3'
Vue.use(VueReCaptcha, { siteKey: RECAPTCHAV3_PUBLIC_KEY })

import store from '@/store';

// Import VeeValidate
import VeeValidate from 'vee-validate';
const config = {
    aria: true,
    classNames: {},
    classes: false,
    delay: 0,
    dictionary: null,
    errorBagName: 'verrors', // change if property conflicts
    events: 'input|blur',
    fieldsBagName: 'vfields',
    i18n: null, // the vue-i18n plugin instance
    i18nRootKey: 'validations', // the nested key under which the validation messages will be located
    inject: true,
    locale: 'en',
    validity: false,
    useConstraintAttrs: true
};
Vue.use(VeeValidate, config);
VeeValidate.Validator.extend('verify_password', {
  getMessage: field => `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number`,
  validate: value => {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
      return strongRegex.test(value);
  }
});

// Vue Localstorage
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true 
});

// BootstrapVue import globally
import BootstrapVue from 'bootstrap-vue'
import vClickOutside from "v-click-outside";
Vue.use(BootstrapVue)
Vue.use(vClickOutside);

import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2, {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    title: 'swal2-theme-title',
   
  }
});

// base64 Enc Dec
import base64 from './base64'
const base64lib = {
    install () {
        Vue.base64 = base64
        Vue.prototype.$base64 = base64
    }
}
Vue.use(base64lib)

import helpers from './helpers'
const helperslib = {
    install () {
        Vue.helpers = helpers
        Vue.prototype.$helpers = helpers
    }
}
Vue.use(helperslib)

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)
Vue.mixin(Vue2Filters.mixin)


import VueLazyload from 'vue-lazyload'
//Vue.use(VueLazyload)

/*const loadimage = require('./assets/loading.gif')
const errorimage = require('./assets/error.gif')
*/
Vue.use(VueLazyload, {
  preLoad: 1.1,
  //error: errorimage,
  //loading: loadimage,
  attempt: 1
})

const app = new Vue({
    el: '#app',
    router,
    store,
    beforeCreate() {
      this.$store.commit('initialiseStore');
    }
});
