import "es6-promise/auto";
import axios from "axios";
require("@/bootstrap");
import Vue from "vue";
// import VueTouch from 'vue-touch';
import VueAuth from "@websanova/vue-auth";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import Index from "./Index";
import auth from "./auth";
import router from "./router";
require("@/directives");

// import DynamicMarquee from 'vue-dynamic-marquee';
// Vue.component('dynamic-marquee', DynamicMarquee);

// Vue.use(VueTouch);

// Set Vue globally
window.Vue = Vue;

// Set Vue router
Vue.router = router;
Vue.use(VueRouter);

// Vue Cookies
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

// Set Vue authentication
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "/";
// axios.defaults.timeout = 20000;
// axios.defaults.headers.common['X-CSRFToken'] = document.head.querySelector('meta[name="csrf-token"]').content;
//axios.defaults.headers.common['X-CSRFToken'] = $cookies.get('csrftoken');

Vue.use(VueAuth, auth);
// Load Index
Vue.component("index", Index);

import store from "@/store";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("en", en);

extend("verify_password", {
  getMessage: (field) =>
    `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number`,
  validate: (value) => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    return strongRegex.test(value);
  },
});

// Install components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

// Import VeeValidate
// import VeeValidate from 'vee-validate';
// const config = {
//     aria: true,
//     classNames: {},
//     classes: false,
//     delay: 0,
//     dictionary: null,
//     errorBagName: 'verrors', // change if property conflicts
//     events: 'input|blur',
//     fieldsBagName: 'vfields',
//     i18n: null, // the vue-i18n plugin instance
//     i18nRootKey: 'validations', // the nested key under which the validation messages will be located
//     inject: true,
//     locale: 'en',
//     validity: false,
//     useConstraintAttrs: true
// };

// Vue.use(VeeValidate, config);

// VeeValidate.Validator.extend('verify_password', {
//   getMessage: field => `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number`,
//   validate: value => {
//       var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
//       return strongRegex.test(value);
//   }
// });

import { VueReCaptcha } from "vue-recaptcha-v3";
Vue.use(VueReCaptcha, { siteKey: RECAPTCHAV3_PUBLIC_KEY });

// Vue Localstorage
import VueLocalStorage from "vue-localstorage";

Vue.use(VueLocalStorage, {
  name: "ls",
  bind: true,
});

// BootstrapVue import globally
import BootstrapVue from "bootstrap-vue";
import vClickOutside from "v-click-outside";
Vue.use(BootstrapVue);
Vue.use(vClickOutside);
import "bootstrap-vue/dist/bootstrap-vue.css";

import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);

// crypto Enc Dec
import crypto from "./crypto";
const cryptolib = {
  install() {
    Vue.crypto = crypto;
    Vue.prototype.$crypto = crypto;
  },
};
Vue.use(cryptolib);

// base64 Enc Dec
import base64 from "./base64";
const base64lib = {
  install() {
    Vue.base64 = base64;
    Vue.prototype.$base64 = base64;
  },
};
Vue.use(base64lib);

// Secure Polling Start

import {
  getBaseURL,
  getCryptoPollingSingleton,
  STANDART_POLLING_INTERVAL,
} from "@/components/securePolling/CryptoPollingSingleton";
if (SECURE_POLLING == 1) {
  getCryptoPollingSingleton().setPollTimeout(STANDART_POLLING_INTERVAL);
  getCryptoPollingSingleton().modifyRequest = function(req) {
    // override, add headers to request, if needed, else
    req.setRequestHeader("Authorization", "#_auth_");
  };
  getCryptoPollingSingleton().connect(
    getBaseURL() + "/polling_api" // thats finwe
  );
}

// Secure Polling End

// pages
import pages from "./pages";
const page = {
  install() {
    Vue.pages = pages;
    Vue.prototype.$pages = pages;
  },
};
Vue.use(page);

import Vue2Filters from "vue2-filters";

Vue.use(Vue2Filters);
Vue.mixin(Vue2Filters.mixin);

const app = new Vue({
  el: "#app",
  router,
  store,
});
