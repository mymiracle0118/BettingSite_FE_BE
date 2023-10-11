import bearer from '@websanova/vue-auth/drivers/auth/bearer'
import axios from '@websanova/vue-auth/drivers/http/axios.1.x'
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x'
// Auth base configuration some of this options
// can be override in method calls
const config = {
  auth: bearer,
  http: axios,
  router: router,
  tokenDefaultName: 'token',
  tokenStore: ['cookie'],
  loginData: {url: 'api/front/login', method: 'POST', redirect: '', fetchUser: false},
  logoutData: {url: 'api/front/logout', method: 'POST', redirect: '/', makeRequest: true},
  fetchData: {url: 'api/front/user', method: 'POST', enabled: true},
  refreshData: {url: 'api/front/refresh', method: 'POST', enabled: true, interval: 30}
}
export default config