"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Login = _interopRequireDefault(require("@/pages/Login"));

var _Dashboard = _interopRequireDefault(require("@/layouts/Dashboard"));

var _Home = _interopRequireDefault(require("@/pages/Home"));

var _GameDetail = _interopRequireDefault(require("@/pages/GameDetail"));

var _Currentbets = _interopRequireDefault(require("@/pages/reports/Currentbets"));

var _AccountStatement = _interopRequireDefault(require("@/pages/reports/AccountStatement"));

var _ActivityLog = _interopRequireDefault(require("@/pages/reports/ActivityLog"));

var _CasinoResult = _interopRequireDefault(require("@/pages/reports/CasinoResult"));

var _LiveCasinoResult = _interopRequireDefault(require("@/pages/reports/LiveCasinoResult"));

var _CasinoDashboard = _interopRequireDefault(require("@/layouts/CasinoDashboard"));

var _OwnCasinoList = _interopRequireDefault(require("@/pages/casino/OwnCasinoList"));

var _OtherList = _interopRequireDefault(require("@/pages/casino/OtherList"));

var _SlotCasinoList = _interopRequireDefault(require("@/pages/casino/SlotCasinoList"));

var _TeenpattiOneDay = _interopRequireDefault(require("@/pages/casino/TeenpattiOneDay"));

var _TeenpattiT = _interopRequireDefault(require("@/pages/casino/TeenpattiT20"));

var _TeenpattiOpen = _interopRequireDefault(require("@/pages/casino/TeenpattiOpen"));

var _Baccarat = _interopRequireDefault(require("@/pages/casino/Baccarat"));

var _Baccarat2 = _interopRequireDefault(require("@/pages/casino/Baccarat2"));

var _Error = _interopRequireDefault(require("@/pages/Error404"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// GAME PAGES
// import Login from '@/pages/Login'
// REPORT PAGES
// CASINO PAGES
// Routes
var routes = [// {
//     path: '/',
//     name: 'landing',
//     redirect: {
//         name: 'home'
//     },
//     meta: {
//         auth: undefined
//     }
// },
{
  path: '*',
  redirect: '/',
  meta: {
    auth: false
  }
}, {
  path: '/',
  name: 'login',
  component: _Login["default"],
  meta: {
    auth: undefined
  }
}, // GAME ROUTES
{
  path: '/',
  name: 'dashboard',
  component: _Dashboard["default"],
  children: [{
    path: '/sport',
    name: 'home',
    component: _Home["default"]
  }, {
    path: '/sport/detail/:etid/:gameId',
    name: 'gameDetail',
    component: _GameDetail["default"]
  }, // REPORTS
  {
    path: '/report/currentbets',
    name: 'currentbetsReport',
    component: _Currentbets["default"]
  }, {
    path: '/report/accountstatement',
    name: 'accountstatementReport',
    component: _AccountStatement["default"]
  }, {
    path: '/report/activity',
    name: 'activity',
    component: _ActivityLog["default"]
  }, {
    path: '/report/casinoresult/:gameType?',
    name: 'casinoResult',
    component: _CasinoResult["default"]
  }, {
    path: '/report/livecasinoresult',
    name: 'liveCasinoResult',
    component: _LiveCasinoResult["default"]
  }, // CASINO ROUTES 
  {
    path: 'casino',
    name: 'owncasinolist',
    component: _OwnCasinoList["default"]
  }, {
    path: 'fantasy',
    name: 'otherlist',
    component: _OtherList["default"]
  }, {
    path: 'casino/teenpattioneday',
    name: 'teenpattiOneday',
    component: _TeenpattiOneDay["default"]
  }, {
    path: 'casino/teenpattit20',
    name: 'teenpattiT20',
    component: _TeenpattiT["default"]
  }, {
    path: 'casino/teenpattiopen',
    name: 'teenpattiOpen',
    component: _TeenpattiOpen["default"]
  }, {
    path: 'casino/baccarat',
    name: 'baccarat',
    component: _Baccarat["default"]
  }, {
    path: 'casino/baccarat2',
    name: 'baccarat2',
    component: _Baccarat2["default"]
  }, // ERROR
  {
    path: '/404',
    name: 'error404',
    component: _Error["default"]
  }],
  meta: {
    auth: true
  }
}, // SLOT ROUTES
{
  path: '/casino',
  name: 'casinodashboard',
  component: _CasinoDashboard["default"],
  children: [{
    path: '/slot',
    name: 'slotcasinolist',
    component: _SlotCasinoList["default"]
  }],
  meta: {
    auth: true
  }
}, {
  path: '*',
  redirect: '/404',
  meta: {
    auth: true
  }
}];
var router = new _vueRouter["default"]({
  base: process.env.MIX_VUE_BASE_URL || '/',
  history: true,
  mode: 'history',
  routes: routes
});
var _default = router;
exports["default"] = _default;